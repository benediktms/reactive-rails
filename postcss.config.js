let enviornemnt = {
  plugins: [
    require('tailwindcss')('./app/javascript/stylesheets/tailwind.config.js'),
    require('postcss-import'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
  ],
};

// this conditional will only apply in a production environemnt to remove unused CSS
// you need to set this environment veriable on Heroku or whatever production platform you use
if (process.env.RAILS_ENV === 'production') {
  enviornemnt.plugins.push(
    require('@fullhuman/postcss-purgecss')({
      // any 3rd party view libaries/frameworks that have their own file extensions, such as React with TS will have to get referenced here
      // for example './app/**/javascript/*.tsx
      content: [
        './app/**/.html.erb',
        './app/helpers/**/*.erb',
        './app/javascript/**/*.js',
      ],
      // fromt he fullhuman/postcss-purgecss library
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      // you can ignore css in your application.scss file with the following syntax:
      /*! purgecss start ignore */
      // any import import statements. This is useful if you know you ther eare components styles you don't currently use, but may use inf the future.
      /*! purgecss end ignore */
    })
  );
}

module.exports = enviornemnt;
