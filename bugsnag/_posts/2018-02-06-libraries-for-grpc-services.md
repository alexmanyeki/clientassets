---
layout: post
title: Packaging Generated Code for gRPC Services
publish_date: February 6th, 2018
author_name: Simon Bowring
author_twitter: bugsnag
author_avatar: simonb
categories: engineering
hero_image: grpc-and-libraries.png
cover_image: grpc-and-libraries-cover.png
---

> This is the second post in a series on how we scaled Bugsnag's new [Releases dashboard](https://blog.bugsnag.com/release-health-and-visibility/) backend pipeline using gRPC. [Read our first blog](https://blog.bugsnag.com/grpc-and-microservices-architecture/) on why we selected gRPC for our microservices architecture.

For the launch of the Releases dashboard in Bugsnag, we undertook a massive project to scale our data-processing Pipeline and break it down into microservices. As you may have [read previously](https://blog.bugsnag.com/grpc-and-microservices-architecture/), we selected [gRPC](https://grpc.io/) as our communication framework that would allow our services to talk to each other, and we began the process of defining the Protocol Buffers necessary to support the gRPC API. Not only does gRPC use the blazingly fast [HTTP/2 binary protocol](https://developers.google.com/web/fundamentals/performance/http2/), but it also makes use of Google's [Protocol Buffers](https://developers.google.com/protocol-buffers/); a major reason for choosing gRPC.

In this post, we'll take a dive deeper into Protocol Buffers and how we implemented them in the Bugsnag Pipeline.

## What are Protocol Buffers?

Protocol Buffers, or Protobufs, are a mechanism for defining data structures, converting data in the structure to and from a format suitable for sending over the wire (e.g. binary), and generating code to allow the structures to be used in applications. Data structures are defined in [protobuf files](https://developers.google.com/protocol-buffers/docs/overview), or proto files, as [messages](https://developers.google.com/protocol-buffers/docs/proto3#simple). gRPC uses proto files to [define services](https://developers.google.com/protocol-buffers/docs/proto3#services), where the messages are the input and output of the service. This is an example service definition with a single service call defined to get the details of a user from an ID:

```protobuf
// The user service definition.
service UserService {
  // The call to get a user's details.
  rpc GetUser (GetUserRequest) returns (GetUserResponse);
}

// The request containing the user ID.
message GetUserRequest {
  string user_id = 1;
}

// The response containing the user's details.
message GetUserResponse {
  string name = 1;
  string email = 2;
}
```

As you can see, proto files are easy to read and write and have a [well defined structure](https://developers.google.com/protocol-buffers/docs/proto3).

As well as being the canonical service definition, server and client code can be generated directly from the proto files for the languages that we use [and more](https://grpc.io/docs/). Great! This means that we can focus more on writing application logic than [boilerplate code](https://en.wikipedia.org/wiki/Boilerplate_code) and we can guarantee the generated code exactly matches the service definition.

## The challenges of generated code from `.proto` files

We were excited to directly generate code from the proto files, but we ran into some challenges after generating the code:

 - **Do we copy and paste it into every code repository where it is needed?**
   Aside from being a frustrating and error-prone manual process, maintenance can be an issue.

 - **If a proto file has been changed several times, how can we tell at a glance that all clients are using the latest version of the generated code?**

 - **How old is the code?**

 - **What state was the proto file in when this code was generated?**
   We have no version number of the proto file and no version number of the generated code to tie the two together.

These aren't questions you want to be asking when trying to fix critical bugs.

Another problem with storing generated code alongside application code is the temptation to change the generated code manually when a change is required rather than updating the source. This is always a bad idea as the manual changes can easily be wrong, or could be overwritten and make the source of the generated code, in our case a proto file, outdated.

### Our Solution: Packaging the generated code into libraries

We found a good solution for dealing with the generated code by packaging it into libraries that can be reused for the server and clients. By having the automatically generated code for each language from the proto files packaged and available, we avoid having duplicate code all over the place. All we need to do to use the protobuf in our applications is specify which library to use and which version.

We also wanted the library generation process to be as automated as possible and avoid a potentially painful, manual process. Ideally we would have an easy way to create a new version of the libraries and easily upgrade the client and server anytime there are changes to the proto files.

Now let's take a look at the actual decisions and steps we took to create our gRPC service libraries.

## Organizing the proto files

The heart of the gRPC service library generation process is a Git repository to store the proto files. The idea here was to have a central place for all of Bugsnag's service definitions. We're not the only ones that have a central repository for all of our proto files; [Namely do the same](https://medium.com/namely-labs/how-we-build-grpc-services-at-namely-52a3ae9e7c35).

The proto files in the repo are organized by the service where the gRPC API will belong, where each service can have multiple proto files. The structure looks like this:

```bash
protobuf
├── error_service
│   └── errors.proto
├── event_service
│   └── events.proto
└── release_service
    ├── releases.proto
    └── releases_view.proto
```

## Proto file validation

When adding a new proto file to our repository, or modifying an existing file, we need to make sure the file does not contain any errors, such as referencing a message that does not exist.

We also need to make sure we conform to the [style guide](https://developers.google.com/protocol-buffers/docs/style) so our proto files are consistent and easy to read.

We use the [protoc](https://github.com/google/protobuf#protocol-compiler-installation) command line tool with the [protoc-gen-lint](https://github.com/ckaznocha/protoc-gen-lint) plugin as part of our [Buildkite](https://buildkite.com/) CI process to validate our proto files. This identifies any errors or style issues present in the files that we'll fix before code generation.

## Proto file versioning

The proto file is the source of truth for a gRPC service definition. When generating the library from a proto file, giving them the same version number is crucial in order to eliminate any confusion surrounding which version of the proto file goes with which version of the library.

To store the proto file version numbers, we use git tags that include the service name, proto file name, and version number. The tags are applicable to the entire repository and the inclusion of all details in the tag allow us to identify a specific version of a single proto file, for example `release_service/releases/1.2.5`.

A handy script helps us automatically increment the patch version of a proto file and create and push the new tag, but we still must manually tag major and minor versions.

## Generating libraries from proto files

We've set up an automated process in Buildkite to generate our Java and Ruby libraries. Once a proto file is tagged, Buildkite detects the tag and begins creating the library from the proto file. Here's what happens:

1. Identify the proto file name from tag and use to generate library name, e.g. `grpc-releaseservice-releases`
2. Identify the version number from tag, e.g. `1.2.5`
3. Generate code for each supported language
4. Package the code into a library for each language with the generated name and version number, e.g. `grpc-releaseservice-releases-1.2.5.jar`
5. Publish the libraries

Let's take a look at the language-specific steps for generating the Java and Ruby libraries.

### Java

We use [Gradle](https://gradle.org/) to generate [JAR files](https://en.wikipedia.org/wiki/JAR_(file_format)) with Google's [protobuf plugin](https://github.com/google/protobuf-gradle-plugin) and [protobuf gRPC java plugin](https://github.com/grpc/grpc-java/tree/master/compiler). A single build.gradle file is all that is needed here, but pulling everything together was a little tricky. Here's how we did it:

```groovy
dependencies {
    compile("io.grpc:grpc-netty:1.7.0")
    compile("io.grpc:grpc-protobuf:1.7.0")
    compile("io.grpc:grpc-stub:1.7.0")
}

protobuf {
    protoc {
        artifact = "com.google.protobuf:protoc:3.4.0"
    }
    plugins {
        grpc {
            artifact = "io.grpc:protoc-gen-grpc-java:1.7.0"
        }
    }
    generateProtoTasks {
        all()*.plugins {
            grpc {}
        }
    }
    generatedFilesBaseDir = "$projectDir/src"
}
```

That is enough to generate the code, but to build the JAR, we need the help of the [java-library plugin](https://guides.gradle.org/building-java-libraries/). This is the build.gradle configuration we used:

```groovy
sourceSets {
  main {
    proto {
      // In addition to the default "src/main/proto"
      srcDir "proto"
      srcDir "src/main/grpc"
    }
  }
}

task sourcesJar(type: Jar, dependsOn: classes) {
    classifier = "sources"
    from sourceSets.main.allSource
}
```

### Ruby

We need to install the [grpc tools](https://grpc.io/docs/quickstart/ruby.html) in order to generate Ruby code:

```bash
gem install grpc
gem install grpc-tools
```

We then build [gems](http://guides.rubygems.org/what-is-a-gem/) for Ruby where the generated code will live. We create a new directory for our gem structure and copy our protobuf file into a new folder called `proto`. In the gem parent directory, we then execute the following command which will put our code into the `lib` directory:

```bash
grpc_tools_ruby_protoc -I ./proto/ --ruby_out=./lib --grpc_out=./lib ./proto/$GRPC_PROTOBUF_NAME.proto
```

We use a single template gemspec to create our real gemspec:

```ruby
# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

Gem::Specification.new do |spec|
  spec.name          = "__GRPC_LIB_NAME__"
  spec.version       = "__GRPC_VERSION__"
  spec.summary       = "gRPC interface library for the __GRPC_SERVICE_NAME__ - __GRPC_INTERFACE_NAME__"
  spec.homepage      = "https://bugsnag.com"
  spec.license       = "Nonstandard"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = "__ARTIFACTORY_GEM_REPO_URL__"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files        = Dir['**/*']
  spec.require_path = 'lib'

  spec.add_runtime_dependency 'grpc', '~> 1.6'
en

```

This will include the generated files when building the gem and include the required [grpc dependency](https://github.com/grpc/grpc/tree/master/src/ruby). When creating the real gemspec, the placeholders `__GRPC_LIB_NAME__`, `__GRPC_VERSION__`, `__GRPC_SERVICE_NAME__`, and `__GRPC_INTERFACE_NAME__` are replaced with values generated from the git tag. `__ARTIFACTORY_GEM_REPO_URL__` is the URL of the Artifactory server used to upload gems.

## Publishing the libraries

We use [Artifactory](https://jfrog.com/artifactory/) at Bugsnag for storing other internal libraries so it was a no-brainer to use this to store our gRPC service libraries. We have a [Gradle repository](https://www.jfrog.com/confluence/display/RTF/Working+with+Gradle) for our jars and a [RubyGems repository](https://www.jfrog.com/confluence/display/RTF/RubyGems+Repositories) for our gems.

### Java

For Java, again we use Gradle along with the [Gradle Artifactory plugin](https://www.jfrog.com/confluence/display/RTF/Gradle+Artifactory+Plugin). Here's the configuration required to enable Artifactory publishing:

```groovy
publishing {
    publications {
        mavenJava(MavenPublication) {
            version "${release_version}"
            from components.java
            artifact (sourcesJar) {
                classifier = "sources"
            }
        }
    }
}
```

The publishing of the library is triggered by the Gradle command `gradle publishToArtifactory`. This will build the library with the specified version number and push it to Artifactory.

### Ruby

To publish our gem to Artifactory, it needs to be built then pushed with the following commands:

```bash
gem build $GRPC_LIB_NAME.gemspec
gem push $GRPC_LIB_NAME-$GRPC_VERSION.gem --host $ARTIFACTORY_GEM_REPO_URL
```

## Using the libraries

Adding these libraries to our services requires pulling the libraries down from Artifactory when the services are built.

All of our Java services use Gradle so we use the Gradle Artifactory Plugin to pull down the gRPC service JARs. The library name and version can then be specified as an [external dependency](https://docs.gradle.org/current/userguide/artifact_dependencies_tutorial.html#sec:external_dependencies_tutorial).

For Ruby, we [configure bundler](http://bundler.io/v1.15/bundle_config.html#CREDENTIALS-FOR-GEM-SOURCES) to use Artifactory as a gem source, and then specify the library and version number to use in the [Gemfile](http://bundler.io/gemfile.html).

## Further work

We plan to extend this process for Node.js by generating [npm](https://www.npmjs.com/) packages and storing them in an [Artifactory npm registry](https://www.jfrog.com/confluence/display/RTF/Npm+Registry). It is worth noting that the [Node.js gRPC implementation](https://grpc.io/docs/tutorials/basic/node.html) has the option of using protobuf files directly where the code is generated at runtime using [protobufjs](https://www.npmjs.com/package/protobufjs), meaning code does not need to be generated beforehand. However, the benefits of versioning would be lost.

To extend this process for Go, we're looking at using [dep](https://github.com/golang/dep) and [private Git repositories](https://github.com/golang/dep/blob/master/docs/FAQ.md#how-do-i-get-dep-to-authenticate-to-a-git-repo) that would each contain generated code for a protobuf file.

## Our thoughts

Overall, we are happy with how we have started using gRPC and Protocol Buffers. It took some trial and error, but we now have a consistent way to create, modify, and integrate gRPC services. We can generate and publish libraries for both our Java and Ruby services at the same time, from a single proto file. If we need to make changes to a service definition, we make the change to the proto file and kick off the library generation process. We can then include the new libraries by just changing one line of code. Easy! This has reduced the amount of time we spend on service integration, and helped us to focus more on improving our core functionality.
