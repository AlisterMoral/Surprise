document.addEventListener("DOMContentLoaded", () => {
    const rollButton = document.getElementById("rollButton");
    const shootButton = document.getElementById("shootButton");
    const barrelNumberElement = document.getElementById("barrelNumber");
    const remainingBulletElement = document.getElementById("remainingBullet");
  
    let currentBarrel = null;
    let firstBullet = null;
    let bulletCount = 0;
  
    rollButton.addEventListener("click", rollBarrel);
    shootButton.addEventListener("click", shootBullet);
  
    function rollBarrel() {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      currentBarrel = {
        number: randomNumber,
        damageType: getDamageType(randomNumber)
      };
  
      if (firstBullet === null) {
        firstBullet = currentBarrel.number;
      }
  
      bulletCount = 0;
  
      barrelNumberElement.textContent = "Current Barrel: " + currentBarrel.number + " (" + currentBarrel.damageType + ")";
      remainingBulletElement.textContent = "Remaining Bullet: " + getNextBullet().number + " (" + getNextBullet().damageType + ")";
  
      rollButton.disabled = true;
      shootButton.disabled = false;
    }
  
    function shootBullet() {
      currentBarrel = getNextBullet();
      bulletCount++;
  
      barrelNumberElement.textContent = "Current Barrel: " + currentBarrel.number + " (" + currentBarrel.damageType + ")";
      remainingBulletElement.textContent = "Remaining Bullet: " + getNextBullet().number + " (" + getNextBullet().damageType + ")";
  
      if (currentBarrel.number === firstBullet && bulletCount === 6) {
        reload();
      }
    }
  
    function reload() {
      firstBullet = null;
      barrelNumberElement.textContent = "Current Barrel: Empty";
      remainingBulletElement.textContent = "Remaining Bullet: Reload";
  
      rollButton.disabled = false;
      shootButton.disabled = true;
    }
  
    function getNextBullet() {
      const nextBarrelNumber = (currentBarrel.number % 6) + 1;
      return {
        number: nextBarrelNumber,
        damageType: getDamageType(nextBarrelNumber)
      };
    }
  
    function getDamageType(barrelNumber) {
      switch (barrelNumber) {
        case 1:
          return "Fire";
        case 2:
          return "Cold";
        case 3:
          return "Acid";
        case 4:
          return "Lightning";
        case 5:
          return "Force";
        case 6:
          return "Thunder";
        default:
          return "Unknown";
      }
    }
  });