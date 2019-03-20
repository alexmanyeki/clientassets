# Bugsnag Blog

This repo contains the Bugsnag blog, hosted on <https://blog.bugsnag.com>.

## Contents
- [Installing a copy of the blog](#installation)
- [Running the blog on your computer](#running)
- [Writing a new blog post](#authoring)
- [Pushing a new post live](#publishing)
- [Creating a new category](#new-categories)

## Installation

-   Install `bundler` if you haven't already

    `gem install bundler`

-   Get a copy of the blog files on your machine

    -   *either* [clone via the GitHub App](https://help.github.com/desktop/guides/contributing/cloning-a-repository-from-github-desktop/#cloning-repositories)
    -   *or* run this in your Terminal app:

        ```shell
        cd path-to-your-repos
        git clone git@github.com:bugsnag/blog.git
        ```

-   Install the dependencies

    ```shell
    cd path-to-your-repos/blog
    bundle install
    ```

## Running

-   Start up the blog server

    ```shell
    cd path-to-your-repos/blog
    bundle exec rake
    ```

-   Open the blog in your browser

    Go to <http://localhost:4000>

> __Note__
>
> The local development version uses the config file `_config.dev.yml`. Any time you change this file, you will need to restart the blog server.
>
> This command does not run the [sitemap generation](https://github.com/jekyll/jekyll-sitemap) and enables [incremental](https://jekyllrb.com/docs/configuration/#build-command-options) rebuilds (which is labelled as "experimental") for a faster development cycle. If you need to test the sitemap you can use the following command:
>
> `bundle exec rake serve`

## Authoring

- Create a new branch in Git
- Run the command `bundle exec rake posts:new['an awesome blog']` provide the title of your blog
- Set up your title, categories, and author information at the top of the file.
- Write your blog post in Markdown format. Here's a Markdown [guide](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).
- Preview your blog post on <http://localhost:4000> while you're working on writing it.
- If you want to add images to your post, put them in the `/img/posts` folder.
- Follow the [style guide](#style-guide) below to make sure your post is consistent with our blog conventions
- [Create a pull request](https://help.github.com/articles/creating-a-pull-request/) for your blog post.

## Hero and cover images

New blog posts that have custom artwork should have the artwork provided in two size formats: a 3:2 cover image for the index page, and a 4:1 hero image for the head of the blog post page.

- Upload hero and cover images to img/feature
- In the post frontmatter (the encoded information at the top of each blog post) reference the hero image with hero_image, and the cover image with cover_image
- Not all blog posts need custom imagery. Posts without a hero image will automatically fall back to display a randomly selected pattern graphic.

## Drafts

If you want to publish a draft post that won't show up in the ATOM feed or in the main list of posts then put the post in the `_drafts` directory. When you are ready to publish the post for real, move it to the `_posts` directory and it will appear everywhere it is supposed to. You can also add `draft: true` to the frontmatter for a page and it will have the same effect.

## Publishing

When you're ready to publish, go through the following steps:

- [ ] Get someone to review your pull request
- [ ] Make sure the date in the file name, and the `publish_date` information inside the file is correct.
- [ ] Merge the pull request to send the blog post live
- [ ] Check <http://blog.bugsnag.com> to make sure everything is okay.

## Style Guide

- Use headers to break up the post and make it easier to read.
- Include high resolution images to bring the blog post to life.
- At the end of your blog post, include a `---` break, and then write a conclusion with a call to action that makes sense.
- Include links to other blog posts if possible.

## New Categories

- Create a new folder for the category in the `category` folder, eg `category/news`, copy from an existing category
