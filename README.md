# Responsive-HTML-5-Video

*Work In Progress*

This is a small study project to experiment with the HTML 5 video tag and a JavaScript video player ([Video.js](http://videojs.com)). The focus is on a responsive experience. Not just layout but also video quality and resolution.

## Requirements

To run this project you need to have [Bower](http://bower.io) and [TSD](http://definitelytyped.org/tsd/) installed.
Please also install [Git Large File Storage](https://git-lfs.github.com) for our media assets. (Yes we are students and just wanted to test Git LFS).

Our development language is [TypeScript](http://www.typescriptlang.org), so you need to install the TypeScript compiler as well.

## Setup

Before you can start development or watch the website you need to install all Bower dependencies.
Be sure to be in the project root folder. Then run:

```
bower install
```

Afterwards install all TypeScript definitions with:

```
tsd install
```

##Development

If you want to compile the project run `tsc` in your terminal. Or if you are lazy just use the watch option for the TypeScript compiler `tsc -w`.
You can open and watch the website in the `dist` Folder.
