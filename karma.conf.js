module.exports = function(config) {
    config.set({
      frameworks: ['jasmine'],
      browsers: ['Chrome'], // or any other browser you prefer
      files: [
        // Add your test files and source files here
        'src/**/*.spec.ts'
      ],
      preprocessors: {
        'src/**/*.spec.ts': ['webpack', 'sourcemap']
      },
      webpack: {
        // Your webpack configuration
      },
      reporters: ['progress', 'kjhtml']
    });
  };
  