module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: {
    content: [
      './components/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}'
    ],
    options: {
      whitelist: [
        'my-3',
        'text-3xl',
        'font-bold',
        'border-solid',
        'border-b-2',
        'pt-4',
        'pb-4',
        'border-gray-600',
        'list-disc',
        'pl-10',
        'pb-2'
      ]
    }
  },
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
};
