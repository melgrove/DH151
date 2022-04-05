  const currentDegree = 180;
  let agentArray = []
  let isCreating = true;
  newAgent();
  
  const makeColor = () => Array(3).fill().map(e => Math.floor(Math.random() * 256));
  let color = [255, 127, 80]
  
  function setup() {
    const canvasBgDiv = document.getElementById('canvas-bg');
    const {offsetWidth, offsetHeight} = canvasBgDiv;
    let c = createCanvas(offsetWidth, offsetHeight);
    c.parent('canvas-bg')
    background("black");
  }
  
  function draw() {
    agentArray.forEach(agent => {
        line(agent.pastX, agent.pastY, agent.x, agent.y);
        const age = agent.age > 200 ? 200 : agent.age;
        stroke(`rgba(${color.join(', ')},${(1 - age/200)})`);
    })
    agentArray = updateAgents(agentArray)
  }


  async function newAgent(x, y) {
    while(isCreating === true) {
        await new Promise(r => setTimeout(r, 10));
        agentArray.push({
            x: mouseX,
            y: mouseY,
            pastX: mouseX,
            pastY: mouseY,
            currentDegree,
            age: 0
        })
    }
  }

  document.getElementById('color-change').addEventListener('click', (e) => {
      color = makeColor();
  })

  function updateAgents(agentArray) {
      return agentArray.map(agent => {
        // purge
        if(Math.random() > 0.995) return null
        // calc new direction
        const change = Math.random() * 10 - 5;
        const newCurrentDegree = agent.currentDegree + change;
        const xHat = sin(radians(newCurrentDegree))
        const yHat = cos(radians(newCurrentDegree))

        const newX = agent.x + xHat;
        const newY = agent.y + yHat;

        const newAge = agent.age + 1;

        return {
            x: newX,
            y: newY,
            pastX: agent.x,
            pastY: agent.y,
            currentDegree: newCurrentDegree,
            age: newAge
        };

      }).filter(a => a !== null);
  }
