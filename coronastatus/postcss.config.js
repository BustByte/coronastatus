/**
 * Big thanks to the instructions here!
 * https://flaviocopes.com/tailwind-setup/
 */

const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

/**
 * Custom PurgeCSS Extractor
 * https://github.com/FullHuman/purgecss
 * https://github.com/FullHuman/purgecss-webpack-plugin
 */
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}

// Add colors here when you add them in the code
const colors = ['red', 'blue'];

module.exports = {
  plugins: [
    tailwindcss('tailwind.config.js'),
    cssnano({
      preset: 'default'
    }),
    purgecss({
      content: ['app/views/pages/*.ejs', 'app/views/partials/*.ejs'],
      whitelist: colors.reduce((list, color) => {
        // Add classes here when you add them in alert.ejs
        list.push(
          `bg-${color}-100`,
          `text-${color}-400`,
          `border-${color}-400`,
          `text-${color}-700`
        );
        return list;
      }, []),
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ['html', 'js', 'ejs']
        }
      ]
    }),
    autoprefixer
  ]
};
