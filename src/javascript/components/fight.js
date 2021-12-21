import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {

  return new Promise((resolve) => {
    const healthBarFirstFighter = document.querySelector('#left-fighter-indicator');
    const healthBarSecondFighter = document.querySelector('#right-fighter-indicator');
    let firstFighterBar = healthBarFirstFighter.offsetWidth;
    let secondFighterBar = healthBarSecondFighter.offsetWidth;
    let downKeys = {};
    document.addEventListener('keydown', event => {
      downKeys[event.code] = true;
      if (downKeys[controls.PlayerOneAttack] && downKeys[controls.PlayerTwoBlock]) {
        firstFighterAttack(firstFighter,secondFighter);
        console.log('PlayerOneAttack PlayerTwoBlock!');
      } else if (downKeys[controls.PlayerTwoAttack] && downKeys[controls.PlayerOneBlock]) {
        secondFighterAttack(secondFighter,firstFighter);
        console.log('PlayerTwoAttack PlayerOneBlock!');
      } else if (downKeys[controls.PlayerTwoAttack] && downKeys[controls.PlayerTwoBlock]) {
        console.log('PlayerTwo don\'t cheat!');
      } else if (downKeys[controls.PlayerOneAttack] && downKeys[controls.PlayerOneBlock]) {
        console.log('PlayerOne don\'t cheat!');
      } else if (downKeys[controls.PlayerOneAttack]) {
        firstFighterAttack(firstFighter,secondFighter);
        console.log('PlayerOneAttack!');
      } else if (downKeys[controls.PlayerTwoAttack]) {
        secondFighterAttack(secondFighter,firstFighter);
        console.log('PlayerTwoAttack!');
      }
      setResolve();
    });
    document.addEventListener('keyup', event => {
      downKeys[event.code] = false;
    });

    function firstFighterAttack(firstFighter, secondFighter) {
      let damage = getDamage(firstFighter,secondFighter);
      if (damage >= 0) {
        let x = (healthBarFirstFighter.offsetWidth * damage) / secondFighter.health;
        healthBarSecondFighter.style.width = `${secondFighterBar - x}px`;
        secondFighterBar = secondFighterBar - x;
      }
    }

    function secondFighterAttack(secondFighter,firstFighter) {
      let damage = getDamage(secondFighter,firstFighter);
      if (damage >= 0) {
        let x = (healthBarSecondFighter.offsetWidth * damage) / firstFighter.health;
        healthBarFirstFighter.style.width = `${firstFighterBar - x}px`;
        firstFighterBar = firstFighterBar - x;
      }
    }

    function setResolve() {
      if (firstFighterBar <= 0) {
        resolve(secondFighter);
      } else if (secondFighterBar <= 0) {
        resolve(firstFighter);
      }
    }
  });

}

export function criticalAttack(fighter) {
  return fighter.attack * 2;
}

export function getDamage(attacker, defender) {
  // return damage
  return getHitPower(attacker) - getBlockPower(defender);
}

export function getHitPower(fighter) {
  // return hit power
  let criticalHitChance = (Math.random() * 2) + 1;
  return fighter.attack * criticalHitChance;

}

export function getBlockPower(fighter) {
  // return block power
  if (fighter) {
    let dodgeChance = (Math.random() * 2) + 1;
    return fighter.defense * dodgeChance;
  }
  return 0;
}

