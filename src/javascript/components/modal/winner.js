import { createFighterImage } from '../fighterPreview';
import { showModal } from './modal';

export function showWinnerModal(fighter) {
  // call showModal function
  let createWinner = {
    title: `Winner - ${fighter.name}`,
    bodyElement: createFighterImage(fighter)
  };
  showModal(createWinner);
}