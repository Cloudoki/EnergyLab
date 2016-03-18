var Config = {
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
          'img/sven01.mp4',
          'img/sven02.mp4',
          'img/sven03.mp4'
        ]
      },
      soda: {
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

