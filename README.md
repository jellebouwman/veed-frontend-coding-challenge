This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies using pnpm:

```zsh
pnpm install
```

Then, to start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Tests

To run tests with vite, use the following command:

```zsh
pnpm test
```

## Libraries worth mentioning

I've added a couple things:,

- `prettier` and `eslint` along with some plugins. Pretty standard stuff for linting frontend projects these days. You can go pretty crazy with the automation here, but I left it pretty vanilla. The main point I want to get across is that I care about consistent files, and that I want to spend as little time worrying about it as possible. If we find a new rule we like, apply and move on!

- `vitest`, `@testing-library` and friends. I really like using testing library to test business logic. The main example in this assesment is probably the `Repositories` component. Testing it like this is quick and reliable. I do like using something like Storybook for visual regression tests (I've used this in conjuction with Chromatic), but have not included it here yet. I use end-to-end tests sparingly, and unit tests wherever I can for separate functions.

- `zod` - a frontend web app that interfaces with APIs will always deal with uncertainties. Typescript is a build time type checker that can help out a lot, but for validating external data into a Typescript project, I really like using `zod`: a runtime schema validator. Got inspired to use stuff like this by this great article: [https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/)

- `@heroicons` - I could have easily inlined a bunch of svg code in this project, and most projects I have worked on have used some sort of Design System with re-usable icons. This gets the job done quite easily - since I was not able to enter 'dev' mode in the Figma file that was provided to snatch the svgs in the design.

- `date-fns` - The standard Library for JavaScript is improving each year, but working with dates can be tedious still. This library is small (not loading the entire Big Ben like `moment.js` used to) and has good documentation. I've been using it where I need it for a long time.
