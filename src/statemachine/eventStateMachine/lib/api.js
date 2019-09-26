export const getPeripheral = (item) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = {
        monitor: () => resolve({ item, count: 23 }),
        laptop: () => resolve({ item, count: 0 }),
        mouse: () => reject('NOPE')
      };

      res[item] ? res[item]() : reject('NOPE');
    }, 500);
  });

export const getEvent = (event) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = {
        '200': () => resolve({ event, item: 'monitor', pinged: true }),
        '202': () => resolve({ event, item: 'monitor', pinged: false }),
        '400': () => resolve({ event, item: null }),
        '500': () => reject('NOPE')
      };

      res[event] ? res[event]() : reject('NOPE');
    }, 500);
  });
