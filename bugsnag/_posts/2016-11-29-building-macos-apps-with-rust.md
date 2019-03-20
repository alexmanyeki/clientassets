---
layout: post
title: Building native macOS applications with Rust
publish_date: November 29, 2016
author_name: Delisa Mason
author_twitter: kattrali
author_avatar: delisa
categories: engineering
hero_image: mac-apps-with-rust.png
---

[Rust](https://www.rust-lang.org) is a systems programming language focused on
speed and safe concurrency, and which I've been using for personal projects
heavily since the 1.0 release last year. Most of these projects have been
replacements for existing scripts in my workflows or new command line tools, but
I wanted to create a Mac application and determine if it would benefit from
Rust's memory efficiency, safety, and [robust library ecosystem](https://crates.io).

I've done iOS and Mac application development for many years and its worth
noting that the hardest part of Cocoa development has always been learning the
frameworks rather than the languages. This experiment is about applying Cocoa
and Rust knowledge to create something safe and yet easy to work with.

## Getting started with Cocoa crates

There are already crates for working with the Objective-C runtime, such as the
[`objc`](https://crates.io/crates/objc) and
[`block`](https://crates.io/crates/block) crates, which are for using the
runtime directly and interfacing with Apple's block extensions respectively. The
`objc` crate in particular provides the `msg_send!` macro, which is a basic
interface to messaging Objective-C objects. Here's an example of creating an
NSObject:

```rust
unsafe {
    let cls = Class::get("NSObject").unwrap();
    let obj: *mut Object = msg_send![cls, new];
}
```

The [`cocoa` crate](https://crates.io/crates/cocoa) builds on this to provide an
interface to using frameworks including
[AppKit](https://developer.apple.com/documentation/appkit) for drawing windows and
views onscreen. It also has an interesting take on implementing Objective-C
classes in that translates them to traits which are implemented by a generic
`NSObject` type. This snippet creates an app and a window, and presents it
onscreen:

```rust
unsafe {
    let _pool = NSAutoreleasePool::new(nil);
	let app = NSApp();
	app.setActivationPolicy_(NSApplicationActivationPolicyRegular);

	let window = NSWindow::alloc(nil).initWithContentRect_styleMask_backing_defer_(
        NSRect::new(NSPoint::new(0., 0.), NSSize::new(200., 200.)),
        NSTitledWindowMask as NSUInteger,
        NSBackingStoreBuffered,
        NO
    ).autorelease();
    let title = NSString::alloc(nil).init_str("Hello World!");
    window.setTitle_(title);
    window.makeKeyAndOrderFront_(nil);

    app.run();
}
```

Pretty cool, though as is, the entire interface is unsafe, missing the hopeful
goal of the experiment.  This approach could still be interesting when writing
the application core code in Rust, and then packaging it using Cocoa bindings.

## Wrapping Cocoa APIs in "safety"

Given those caveats, couldn't we create Rust wrappers for Objective-C classes?
Of course! After some trial and error, I had a base trait to use for wrapping
and interacting with Objective-C objects:

```rust
use objc::runtime::Object;

pub type Id = *mut Object;

pub trait ObjCClass: Sized {

    /// Returns pointer to underlying objc object
    fn ptr(&self) -> Id;

    /// Creates an instance from an objc object pointer, failing
    /// if the pointer is not an instance of the wrapped class
    fn from_ptr(ptr: Id) -> Option<Self>;

    /// The printed name of the class
    fn class_name() -> &'static str;

    /// Type-safe reference to an instance with a nil pointer
    fn nil() -> Self;

    /// Performs an `isKindOfClass` check to whether a particular
    /// pointer is an instance of the wrapped class
    fn ptr_is_class(ptr: Id) -> bool;

    /// Change an instance of one class into another, failing if
    /// the pointer is not an instance of the preferred class.
    /// Useful for converting between inherited classes e.g.
    /// NSDictionary to NSMutableDictionary.
    fn coerce<T: ObjCClass>(&self) -> Option<T> {
        T::from_ptr(self.ptr())
    }

    /// Designate this instance as suitable for being released
    /// once it is out of scope
    fn autorelease(&self) -> Self;

    /// Drop the Objective-C reference. The object is then invalid
    fn release(&mut self);
}
```

Note that this creates a Rust object with a reference to an Objective-C object,
but the overall effect is minimal as most interaction still happens in
Objective-C runtime land.

Using this trait was most easily done creating a handy
[macro](https://github.com/kattrali/rust-mac-app-examples/tree/master/4-wrapping-cocoa-apis/src/objc_class.rs)
named `impl_objc_class`, and then wrapping the average class became easy! Here's
an example which wraps a few methods on `NSString`.

```rust
const UTF8_ENCODING: NSUInteger = 4;

impl_objc_class!(NSString);
impl NSString {

    /// Creates an `NSString` from a `str`.
    pub fn from(content: &str) -> Self {
        let ptr: *mut Object = unsafe {
            let string: *mut Object = msg_send![class!("NSString"), alloc];
            msg_send![string, initWithBytes:content.as_ptr()
                                     length:content.len()
                                   encoding:UTF8_ENCODING]
        };
        NSString { ptr: ptr }
    }

    /// The length of the string as measured in UTF-8 code points
    pub fn len(&self) -> usize {
        unsafe { msg_send![self.ptr, lengthOfBytesUsingEncoding:UTF8_ENCODING] }
    }
}
```

The class can now be used directly, and without `unsafe`:

```rust
let greeting = NSString::from("hello");
assert_eq!(greeting.len(), 5);
```

Resources still need to be released (or auto-released, if applicable) when they
are no longer needed, but classes became much easier to use. I explored some
options such as implementing a
[`Drop`](https://doc.rust-lang.org/std/ops/trait.Drop.html) trait to
automatically discard Objective-C objects once the Rust reference goes out of
scope, but this behavior is not always desirable, especially when working with
references to applications and windows which are expected to stay for the
lifetime of the application, or at least longer than the current scope.


## Packaging Rust into an app

While we can use the snippets of the cocoa crate to run an executable, the
executable is not packaged as an app bundle, which would be suitable for having
an app icon, putting an app in the dock, or being registered as a default
application (like being the mail client used for `mailto:` links, for example).
For that, we'd need to package the executable into an app bundle.

An easy way to create an app bundle which launches Rust code is to create a
Cocoa app with a Rust and dependent app target. This requires a few steps in
Xcode:

1. Create a new app using the Cocoa app template
2. Add a second "External build system" target to the application which creates
   the Rust binary
3. Add the second target to the default app target as a dependency
4. Add the rust executable as a bundled resource of the app target
5. Replace the default AppDelegate with a script to launch the Rust binary,
   something like this bit of Swift:

   ```swift
   let task = Process()
   task.launchPath = Bundle.main.path(forResource: "my-rust-program", ofType: nil)
   task.launch()
   task.waitUntilExit()
   ```

I've created an [example](https://github.com/kattrali/rust-mac-app-examples/tree/master/3-packaging-a-mac-app)
which shows all of these parts in action, adds an app icon, and pipes output
from the Rust executable to the system console.


## Conclusions

The initial results were less than ergonomic when using the existing Cocoa crate
since the interface did not add additional safety, and perhaps removed some
because the generic object type conformed to every Cocoa class trait. I could
(and did) call the wrong methods on Cocoa class instances.

Writing my own layer of classes on top of `objc` improved the latter, though it
was more initial overhead to write wrappers before using classes, and still felt
clumsy when converting between values in [class
clusters](https://developer.apple.com/library/content/documentation/General/Conceptual/CocoaEncyclopedia/ClassClusters/ClassClusters.html)
for example. There is potential for a "Rustier" crate for interfacing with
Objective-C, or a generator which makes ergonomic method names. Despite this,
I mapped a
[number of Objective-C classes by hand](https://github.com/kattrali/webkitten/tree/master/macos/src),
and while my stylistic choices probably aren't suitable for a general use
library, Rust+Cocoa became very fast to use and iterate on ideas. The approach
could be worth a try if you have reusable components in Rust to share with a
Cocoa application, and have constructs unsuitable for use with the foreign
function interface.

There's more I could cover here about the experience, like how to declare your
own Objective-C classes in Rust and implementing protocols, but that should be
the topic of a later post.

I've made some longer examples demonstrating the snippets in this post as well
as a general template usable for packaging a mac app, which is available on
[GitHub](https://github.com/kattrali/rust-mac-app-examples).

Thanks for reading!
