import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)
  const fighterAttr = createElement({
    tagName: 'ul',
    className: 'fighter-preview___info'
  });
  if (fighter) {
    const { name, health, attack, defense } = fighter;
    const nameFighter = createElement({
      tagName: 'li'
    });
    nameFighter.textContent = `Name: ${name}`;
    const attackFighter = createElement({
      tagName: 'li'
    });
    attackFighter.textContent = `Attack: ${attack}`;
    const defenseFighter = createElement({
      tagName: 'li'
    });
    defenseFighter.textContent = `Defense: ${defense}`;
    const healthFighter = createElement({
      tagName: 'li'
    });
    healthFighter.textContent = `Health: ${health}`;
    const imgFighter = createFighterImage(fighter);
    fighterElement.append(imgFighter);
    fighterAttr.append(nameFighter,attackFighter,healthFighter,defenseFighter);
  }
  fighterElement.append(fighterAttr);

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}

