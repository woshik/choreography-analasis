const common = {
  methods: {
    getDataFromObject(obj, key, defaultValue = '') {
      let param = { ...obj };
      const keyArray = key.split('.');
      keyArray.forEach((keyValue) => {
        if (keyValue && param) {
          param = param?.[keyValue] ?? '';
        }
      });

      return param || defaultValue;
    },
  },
};

export default common;
