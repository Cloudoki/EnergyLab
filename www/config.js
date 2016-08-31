var Config = {
    dummyBg: false,
    date: {
        format: 'd mm y',
        separator: [' ', ' ']
    },
    time: {
        format: 'h m',
        separator: ':'
    },
    app: {
        name: 'EnergyLab',
        version: '1.0.0'
    },
    triggers: {
      defaultActive: 0,
      sven: {
        transition: 300, // miliseconds
        videos: [
          {
            id:1,
            url: {
              nl: 'img/energylab25fpsNL.mp4',
              fr: 'img/energylab25fpsFR.mp4'
            },
            trigger:25
          },
          {
            id:2,
            url: {
              nl: 'img/OneMileADayGeelNL.mp4',
              fr: 'img/OneMileADayGeelFR.mp4'
            },
            landscape: true
          },
          {
            id:3,
            url: {
              nl: 'img/3DLoop.mp4',
              fr: 'img/3DLoop.mp4'
            },
            loop: true
          }
        ]
      }
    }
};

