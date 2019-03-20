---
layout: post
title: Use GPG to hide Rails secrets
publish_date: May 12th, 2014
author_name: Jessica Dillon
author_twitter: jessicard
author_avatar: jessica
categories: engineering
---

It has happened to us all. It's late at night and you're working on your side project. You’ve been trying to get that darned external API working for hours, and OH MY GOODNESS IT FINALLY WORKS! You push your changes up and abandon your computer for some well deserved rest. That is, however, until you wake up in the morning and your plain text API key you just threw into your app has been stolen by some jerk on the internet who was looking through GitHub search for unknowing victims. That causes your app to be hacked, your bank accounts to be emptied, and your inevitable arrest.

No? No one? Ok, maybe that's just happened to me then.

"Ugh whatever I don't care," you may be thinking. "My repository is *private*." Well, smartypants, you still need to be careful! If you ever want to open source that repository, your Git history will have these keys smattered throughout for the public to steal. Even if you keep the repository private, what if you want to give a contractor access temporarily?

Fellow Bugsnagger [Conrad Irwin](https://www.twitter.com/conradirwin) wrote [dotgpg](https://github.com/ConradIrwin/dotgpg), a gem [made](http://cirw.in/blog/dotgpg) for backing up and versioning your application secrets or shared passwords securely and easily. dotgpg makes the encryption process pretty simple, only interfacing with the basics of GPG that are needed for what we're trying to accomplish. [Click here](#how-do-i-set-up-dotgpg) to skip right to the good stuff.

## Where should I store my secrets?

According to [Twelve-Factor](http://12factor.net/), an app is supposed to [store its configuration options in environment variables](http://12factor.net/config). Like that API key you just lost. In your code, you should be referencing `ENV["SECRET_PASSWORD"]`, grabbing the value associated with the "SECRET_PASSWORD" key.

### Rails 4.1+
Rails 4.1 has this handy change that [includes a `secrets.yml` file](http://edgeguides.rubyonrails.org/4_1_release_notes.html#config-secrets-yml). All we have to do is add our keys to the file and reference them with `Rails.application.secrets.secret_password`. Easy enough!

### Rails pre-4.1
How do these environment variables get set up? Well, in a Unix shell, you could always export them via command line.

```
export SECRET_PASSWORD="omg-wow-this-is-a-super-secret-password"
```

However, this only lasts for that shell session and then disappears. One solution is to export the environment variable in one of our shell startup scripts (`.bash_profile`, `.zshrc`, etc.). Another is to make a file that stores all of these secrets and then read it in a Rails initializer so that it loads our variables on boot.

We recommend just using a gem like [dotenv](https://github.com/bkeepers/dotenv) that has already solved this problem for us. Dotenv is just a shim to load environment variables from a file named `.env`. Either way, we'll have to add the file containing our secrets to the `.gitignore` to make sure we don't push it up.

## How do I keep my secrets secure?

To get on the crypto-train, we first need to install GPG. We're going to install it on the command line via [homebrew](http://brew.sh/), but if you want a nice GUI, I'd recommend trying out [GPGTools](https://gpgtools.org/).

```
brew install gpg
```

Now that we have GPG installed, we need to generate a public and private key pair.

```
gpg --gen-key
````

You'll be walked through a bunch of prompts. You can use the defaults, but I recommend [reading](https://www.digitalocean.com/community/articles/how-to-use-gpg-to-encrypt-and-sign-messages-on-an-ubuntu-12-04-vps) some [articles](https://alexcabal.com/creating-the-perfect-gpg-keypair/) on options to set up & configure your keys.

There's only a few rules surrounding the key pair you've just made!

1. Never lose your keys or you'll be sent to jail*
1. Never forget your key passcode or you'll be sent to jail*

*There's a small chance you won't be sent to jail, but these are still very important.

Some people store their keys on a flash drive and put it in an actual physical safe, some keep them in cloud providers like Dropbox, and some write them on actual paper. The same goes for your key passcode (I store my key passcodes in [1Password](https://agilebits.com/onepassword)).

For more information about GPG, see the [Extra Notes & Resources](#extra-notes-resources) section.

## How do I set up dotgpg?

To get started, you need to either run `gem install dotgpg` or add `gem "dotgpg"` to your `Gemfile` and run `bundle`. Then, you need to run:

```
dotgpg init
```

Ok awesome! This created a `.gpg` folder, which will later be used to hold each team member’s public key.

A new team member can run `dotgpg key` to output her public key, which she must then send to an existing team member. If she hasn't already created a key, this will walk her through the prompts to do so.

When the key is sent over, the existing team member can run `dotgpg add`, which will prompt her to paste in the new team member’s public key. This will create a file named by the new team member’s GPG e-mail. The file will contain her public key, and will be automatically added into the `.gpg` folder.

Now all collaborators can create and edit files with:

```
dotgpg edit <pgp-encrypted-filename>
```

This will open `<pgp-encrypted-filename>` in your default editor (which you can [change by setting the `EDITOR` environment variable](http://tech.karbassi.com/2007/01/14/change-default-editor/)). After entering your GPG passphrase, you’ll see the decrypted file!

You can also decrypt a PGP-encrypted file and pipe it to standard out (which will also ask for your GPG passphrase):

```
dotgpg cat <pgp-encrypted-filename>
```

## How do I share the secrets?

So now you’re putting all your environment variables in `.bash_profile`, `secrets.yml`, or `.env`, and your coworker is coming up to you because she is having a problem starting her local server. She doesn't have `ENV["SECRET_PASSWORD"]`! Teams have different ways of sharing keys, but now each person generally has to play fill-in-the-blank-scavenger-hunt, go-find-a-random-google-docs-password-file-that-feels-kinda-insecure, overhaul-the-companies-entire-setup-process-by-making-everyone-use-boxen, or the classic bug-my-coworker-until-she-IMs-me-the-key.

Let’s say your repository has a PGP-encrypted `config/secrets.yml.gpg` file (or `.env.gpg` if you’re using Rails pre-4.1). Since `config/secrets.yml.gpg` is encrypted, random users can’t read the application secrets and passwords contained within. However, since your public key has been added to the repository, you can run:

```
dotgpg cat config/secrets.yml.gpg > config/secrets.yml
```

You now have a local copy of all the application secrets and passwords in `config/secrets.yml`! Make sure this is in your `.gitignore`, lest you defeat the whole purpose of all this extra security.

Now, even if you made this repository public, you’re still safe. Only existing team members can `dotgpg add` new public keys, and only people whose public keys have been added can decrypt `config/secrets.yml.gpg`. Removing a team member would entail deleting her public key and rolling the secrets. Unapproved viewers will be locked out, and will have to come up with their own set of application secrets and passwords!

## Extra Notes & Resources

* "GNU Privacy Guard", or GPG, is data encryption and decryption software. You may be wondering why I'm spelling PGP wrong; GPG is a free alternative to "Pretty Good Privacy" or PGP. PGP was originally freeware written by Phillip Zimmerman, but was then [purchased by Symantec](http://philzimmermann.com/EN/findpgp/) who discontinued the freeware version. GPG is a rewrite of PGP created using the OpenGPG standards but different encryption algorithms. This makes it usable between people using other OpenGPG implementations and keeps it free. Check out [this post](http://blog.goanywheremft.com/2013/07/18/openpgp-pgp-gpg-difference/) for more detail on the differences between PGP and GPG.

* In this blog post, we only used GPG to create keypairs, but for any of your other GPG command needs, check out [this cheat sheet](http://irtfweb.ifa.hawaii.edu/~lockhart/gpg/gpg-cs.html).

* After creating your keys, you can upload them to a public key server. This makes your public key searchable by people who want to give you access to stuff. You can do this inside of GPGTools, or you can go to [one of the many servers available](https://keyserver.pgp.com/vkd/GetWelcomeScreen.event) to upload your key.

* [keybase.io](https://keybase.io/) is an awesome in-beta app that is “a public directory of publicly auditable public keys”, where you also have an option to privately store your private key. However, a lot of people [don't recommend storing your private keys on their servers unless they're encrypted](https://filippo.io/on-keybase-dot-io-and-encrypted-private-key-sharing/), so I'd do some [reading](http://security.stackexchange.com/questions/51771/where-do-you-store-your-personal-private-gpg-key) on this to find what best suites you.

* When discussing public key directories, you might think "Uploading your own public key feels pretty easy, couldn’t someone post a fraudulent key under my name?", and you’d be right! That's where key-signing comes in. It's not important for using `dotgpg`, but definitely [read about it](https://www.gnupg.org/gph/en/manual.html#AEN554) and then throw a key signing party of your own! If anything else, it's an excuse to order a bunch of pizza.
