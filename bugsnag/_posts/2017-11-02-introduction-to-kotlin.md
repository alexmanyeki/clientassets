---
layout: post
title: A beginner's guide to Kotlin
publish_date: November 2nd, 2017
author_name: Jamie Lynch
author_twitter: fractalwrench
author_avatar: jamie
categories: engineering
hero_image: kotlin.png
cover_image: kotlin-cover-image.png
---

Google recently [announced first-class support for Kotlin on Android](https://android-developers.googleblog.com/2017/05/android-announces-support-for-kotlin.html), rescuing thousands of grateful mobile developers from the purgatory of Java 7.

So why is Kotlin so popular? In this post, we'll compare Kotlin and Java with side-by-side code samples, and talk about some of the advantages and disadvantages.

## Hello World
Kotlin is a statically-typed language which runs on the JVM, and boasts 100% interoperability with existing Java code. The program below should look very familiar to most Java Developers:

```java
package com.bugsnag.kotlin;

public class App {
    public static void main (String[] args) {
        System.out.println("Hello World!");
    }
}
```

And the following will print "Hello World" in [Kotlin](https://kotlinlang.org/):

```kotlin
fun main(args: Array<String>) {
    println("Hello World!")
}
```

A few differences are obvious, such as the lack of semicolons and how concise our code is.

## Kotlin vs Java

To get a feel for Kotlin, let's take a closer look at its features and how they compare to Java.

### Null Safety
We'll start by exploring one of the most useful features of Kotlin — its support for null safety. In Java, any Object can be `null`. This means that runtime checks must be added throughout a codebase in order to prevent `NullPointerException` crashes, which has often been called a [Billion Dollar Mistake](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare) by language designers.

```java
static class User {
    String name;
}

public void printUsername(User user) {
    if (user.name != null) {
        foo(user.name.length());
    }
}
```

In Kotlin, references to objects must either be nullable, or non-null:

```
class User(var name: String?) // the name property can be null
class User(var name: String) // the name property cannot be null
```

If a developer attempted to pass a nullable object to the second class, a compile time error would occur.

#### Safe call operator
The following will be very familiar to most Java developers. The `user` parameter may be `null`, so a runtime check is required to ensure a `NPE` is avoided.


```java
void printUsername(User user) {
    if (user.getName() != null) {
        foo(user.getName().length());
    } else {
        foo(null); // supply a null Integer
    }
}

void foo(Integer length) {}

```

Kotlin can simplify this with the Safe Call operator. If `name` is not null, then its length will be passed as an argument. Otherwise, a null reference will be passed.

```kotlin
fun printUsername(user: User) {
    foo(user.name?.length) // returns null if user.name is null
}

fun foo(length: Int?) {}
```

Alternatively, if it didn't make sense to execute code when a value was null, we could use `let`:

```kotlin
fun foo(nullableUser: User?) {
    nullableUser?.let { printUsername(nullableUser) } // only print non-null usernames
}
fun printUsername(user: User) {} // User is a non-null reference
```

### Class definitions
Kotlin [classes](https://kotlinlang.org/docs/reference/classes.html) are incredibly concise compared to Java. The following class which defines 3 fields and getters + setters is over 30 lines long!

```java
class User {
    final String name;
    int age = 18;
    String address;

    public User(String name, int age, String address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
```

In Kotlin, we can achieve the same using a single line of code.

```kotlin
class User(val name: String, var age: Int = 18, var address: String?)
```

 Immutable references are also much easier as it's simply a matter of switching from the `var` keyword to `val`.

You may have noticed that for Kotlin a default value can be supplied for parameters. This means that Java patterns such as the [Builder Pattern](https://github.com/iluwatar/java-design-patterns/tree/master/builder) can be eliminated in Kotlin. This can also substantially reduce the amount of code required for syntactic sugar, such as method chaining in public APIs.


#### Data classes
Things get even more concise if the primary purpose of our class is to hold data, such as a JSON payload from an API. In Kotlin these are known as [data classes](https://kotlinlang.org/docs/reference/data-classes.html).

```kotlin
data class User(val name: String, var age: Int = 18, var address: String?)
```

Just adding the `data` keyword will automatically generate `equals()`, `hashCode()`, `toString()`, `copy()` implementations for our class. The equivalent Java implementation of this class is omitted to save both reader sanity and our bandwidth costs.

### Type inference

Kotlin uses type inference, which further increases its brevity. Consider this mouthful of a Java class:

```java
class AbstractSingletonProxyFactoryBean { }

public void foo() {
    AbstractSingletonProxyFactoryBean bean = new AbstractSingletonProxyFactoryBean();
}
```

Whereas the equivalent in Kotlin would look like this:

```kotlin
class AbstractSingletonProxyFactoryBean

fun foo() {
    val bean = AbstractSingletonProxyFactoryBean() // type automatically inferred
}
```

#### Functions

Type inference permeates throughout the language. It is possible to be either explicit or implicit when required, as shown by the two approaches to defining the same function below:

```java
int add(int a, int b) {
    return a + b;
}
```

```kotlin
fun add(a: Int, b: Int): Int { // explicit return type
    return a + b
}

fun add(a: Int, b: Int) = a + b // inferred return type
```

### Properties
Kotlin [Properties](https://kotlinlang.org/docs/reference/properties.html) are simply awesome. Consider the following Java class, which defines a single field with accessor methods:

```java
class Book {
    String author;

    String getAuthor() {
        return author;
    }

    void setAuthor(String author) {
        this.author = author;
    }
}

Book book = new Book();
book.setAuthor("Kurt Vonnegut");
System.out.println(book.getAuthor());
```

Equivalent functionality can be achieved in 4 lines of Kotlin, by defining a class that declares an `author` property. Our getters and setters will automatically be generated:

```kotlin
class Book(var author: String?)
val book = Book()
book.author = "Kurt Vonnegut"
println(book.author)
```

#### Custom Accessors

If custom behaviour is required for getters and setters, it's possible to override the default behaviour. For example:

```kotlin
class Person(var firstName: String, var lastName: String) {

    var fullName: String
        get() = "${firstName} ${lastName}"
        set(value) {
            val split = value.split(" ")
            firstName = split[0]
            lastName = split[1]
        }
}
```

It is also possible to use a [backing field](https://kotlinlang.org/docs/reference/properties.html#backing-fields) if we need to validate a field, or restrict it to certain inputs:

```kotlin
set(value) {
    if ("Santa Claus".equals(value)) field = "Ho Ho HO"
}
```

### Interoperability
Another advantage of Kotlin is that it can be called from Java code, or vice versa, from within the same project.

```java
public class MyJavaClass {
    public String authorName;

    public boolean isTruthyValue() {
        return true;
    }    
}
```

The following Kotlin function instantiates a new Java object and accesses its methods and fields using regular Kotlin syntax. This can be incredibly handy if you want to dip your toe in the water by adding small amounts of Kotlin to an existing Java codebase.

```kotlin
fun main(args: Array<String>) {
    val obj = MyJavaClass()
    println(obj.authorName)
    println(obj.isTruthyValue)
}
```

It's also worth mentioning that Kotlin can be [decompiled back to Java](https://stackoverflow.com/questions/34957430), so if your team doesn't enjoy the language or runs into technical obstacles, it's entirely possible to migrate back.

### Utility methods

Utility or helper classes will look very familiar to all Java developers. A static method will perform some useful operation that isn't available in the Java standard library and will be called across the codebase:

```java
class StringUtils {
    static String sortStringChars(String input) {
        char[] chars = input.toCharArray();
        Arrays.sort(chars);
        return new String(chars);
    }
}
StringUtils.sortStringChars("azbso"); // returns "abosz"
```

In Kotlin, [extensions](https://kotlinlang.org/docs/reference/extensions.html) allow for additional functionality to be added to an existing class, *without* having to extend or wrap that class. For instance, the following would add a `sortStringChars` function to the `String` class:

```kotlin
fun String.sortStringChars(): String {
    val chars = this.toCharArray()
    Arrays.sort(chars)
    return String(chars)
}

fun main(args: Array<String>) {
    "azbso".sortStringChars() // returns "abosz"
}
```

This results in a far more readable syntax — but beware. With great power comes [great responsibility](https://www.philosophicalhacker.com/post/how-to-abuse-kotlin-extension-functions/).


### Functional programming
Kotlin fully supports lambda expressions. Limited Java 8 support has only just been [added to Android](https://developer.android.com/studio/write/java8-support.html), which makes Kotlin's functional programming features particularly welcome.

```kotlin
// filter a list for all authors whose name starts with 'J'
val input = listOf("JK Rowling", "Charles Darwin")
val authors = input.filter { author -> author.startsWith("J") }
println(authors) // JK Rowling
```

It's also possible to use constructs such as `filter` and `map` directly on Collections, which again, is not currently supported on most Android devices.

```kotlin
fun main(args: Array<String>) {
    val input = listOf("JK Rowling", "Charles Darwin", "")
    val authors = input.filter { !it.isEmpty() } // remove empty values
            .map { Author(it) } // map the string to an author object
            .sortedBy { it.name } // sort by author.name

    println(authors) // print the authors in alphabetical order
}
```

Reactive Streams have taken off in popularity in the Android world recently, and they're also supported on Kotlin by the [RxKotlin](https://github.com/ReactiveX/RxKotlin) library.

```kotlin
val cereals = listOf("Kellogs Coroutines", "Cocoa Pods", "Locky Charms")

cereals.toObservable()

    // perform some intensive/complex computation on background thread

    .subscribeBy(onNext = {
       println(it) // observe each cereal on the main thread and print it
    })
```

### Kotlin Native and Javascript

Kotlin primarily targets the JVM, but can also be [transpiled to Javascript](https://kotlinlang.org/docs/tutorials/javascript/kotlin-to-javascript/kotlin-to-javascript.html), or compiled to native code using the LLVM toolchain. These two targets are fairly early on in development, but show great promise for anyone wanting to program in one language across their entire stack.

Kotlin Native is particularly interesting, as Swift already [looks very similar to Kotlin](http://nilhcem.com/swift-is-like-kotlin/), meaning it may one day be possible to use the same native codebase across Android and iOS apps.

Another honourable mention should go to [Gradle Script Kotlin](https://blog.gradle.org/kotlin-meets-gradle), which brings all the benefits of static-typing to the existing Gradle DSL, and [Spring Boot](https://kotlinlang.org/docs/tutorials/spring-boot-restful.html), which provides official support for Kotlin as of `1.5`.

## Potential downsides/gotchas

So what are the downsides to Kotlin?

On Android, application size is a potential concern. Kotlin currently adds around [1Mb to your app size](https://developer.android.com/kotlin/faq.html), and uses around 7,000 methods, although the majority of these can be stripped out by [Proguard](https://www.guardsquare.com/en/proguard). For traditional Java desktop applications, this isn't too big a deal, but for mobile devices with more constrained resources, this may be a deal-breaker for some teams.

Kotlin hasn't been around for as long as Java, and as a result, it's a lot harder to identify bad practices and code smells. Java has 22 years of good practices and linting tools to draw upon, whereas Kotlin doesn't. For instance, extension functions are a very powerful feature, but can easily be used where classes and abstractions should be used instead.

A more human factor is that although Kotlin is very similar to Java, there is always a ramp-up time when learning a new language, which will result in a temporary loss in productivity.

Particularly if everyone on your team has spent the last decade becoming an expert in Java, they may be reluctant to give that up and start again in a language they're not familiar with. External clients may feel less comfortable with Kotlin, as there is a perception that it hasn't been around for as long as Java, and is more unknown.

## Why Kotlin beats Java

Let's summarize some of the main advantages of Kotlin:

- Kotlin is _far_ more concise than Java
- Lambdas and functional constructs have been supported out of the box for years
- 100% interoperability with existing Java code
- Kotlin practically eradicates one of the most common Java errors, the dreaded `NullPointerException`
- IntelliJ IDEA provides great tooling support
- The language has been dog-fooded from the ground-up, and as a result _feels_ like a language designed by someone who programs in it every day

In our opinion, Kotlin beats Java hands down on Android for these reasons. On traditional Java desktop applications, it's a closer contest as Java 8 contains comparable language features such as lambdas, streams, and others. However, we still believe that the brevity of Kotlin wins in this case.

## Advice on getting started with Kotlin

It's impossible to sum up the entirety of a programming language in one blog post, so if you or your team is interested in using Kotlin, our advice would be just to give it a go!

The two most common routes are to begin by writing unit tests in Kotlin, or converting existing Utils classes to Kotlin. IntelliJ IDEA also provides a handy auto-convert shortcut, which migrates existing Java code to Kotlin. While this won't necessarily give you the most idiomatic Kotlin, it's a good way of grokking the syntax in a codebase you're already familiar with.

The most important thing is to continuously evaluate whether everyone is happy with the level of Kotlin adoption, and to identify any pain points or hidden gotchas.

Kotlin is a really great alternative to Java, and has the potential to improve developer happiness, reduce codebase complexity, and increase productivity for your business - if done right.

---

[Bugsnag](https://www.bugsnag.com) automatically monitors your applications for harmful errors and alerts you to them, giving you visibility into the stability of your software. You can think of us as mission control for software quality.

Try Bugsnag's [Kotlin exception reporting](https://www.bugsnag.com/platforms/kotlin/).
