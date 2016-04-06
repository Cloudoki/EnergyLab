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
      defaultActive: 2,
      sven: {
        transition: 300, // miliseconds
        videos: [
          {id:1, url:'img/Composition067.mp4', trigger:20},
          {id:2, url:'img/Composition075.mp4'},
          {id:3, url:'img/Composition076.mp4'},
          {id:4, url:'img/Composition081.mp4'}
        ]
      },
      soda: {
        backgroundColor: 'rgba(163, 198, 23, 0.4)',
        sugarCubes: {
          container: {
            left: 0,
            top: 0
          },
          anim: {
            interval: 200 // miliseconds
          }
        }
      }
    }
};

