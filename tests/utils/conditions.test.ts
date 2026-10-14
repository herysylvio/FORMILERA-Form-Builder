import test from 'node:test';
import assert from 'node:assert/strict';
import { isBlockVisible } from '../../src/utils/conditions';
import type { FormBlock } from '../../src/types/form';

test('isBlockVisible retourne true si le bloc n a aucune condition', () => {
  const block: FormBlock = { id: 'b1', type: 'shortText', label: 'Nom', required: true };
  assert.equal(isBlockVisible(block, {}), true);
});

test('isBlockVisible évalue correctement la condition equals pour choix unique', () => {
  const block: FormBlock = {
    id: 'b2',
    type: 'shortText',
    label: 'Précisez votre secteur',
    required: false,
    condition: { sourceBlockId: 'b1', operator: 'equals', value: 'Autre' }
  };
  assert.equal(isBlockVisible(block, { b1: 'Informatique' }), false);
  assert.equal(isBlockVisible(block, { b1: 'Autre' }), true);
  assert.equal(isBlockVisible(block, {}), false);
});

test('isBlockVisible évalue la condition equals pour choix multiple (array)', () => {
  const block: FormBlock = {
    id: 'b3',
    type: 'shortText',
    label: 'Détails VIP',
    required: false,
    condition: { sourceBlockId: 'b1', operator: 'equals', value: 'VIP' }
  };
  assert.equal(isBlockVisible(block, { b1: ['Standard', 'VIP'] }), true);
  assert.equal(isBlockVisible(block, { b1: ['Standard'] }), false);
});

test('isBlockVisible évalue greater_than, less_than et not_equals', () => {
  const blockLess: FormBlock = {
    id: 'b4',
    type: 'longText',
    label: 'Pourquoi cette note basse ?',
    required: false,
    condition: { sourceBlockId: 'rating1', operator: 'less_than', value: 3 }
  };
  assert.equal(isBlockVisible(blockLess, { rating1: 2 }), true);
  assert.equal(isBlockVisible(blockLess, { rating1: 4 }), false);

  const blockNotEquals: FormBlock = {
    id: 'b5',
    type: 'shortText',
    label: 'Pourquoi pas ?',
    required: false,
    condition: { sourceBlockId: 'choice1', operator: 'not_equals', value: 'Non' }
  };
  assert.equal(isBlockVisible(blockNotEquals, { choice1: 'Oui' }), true);
  assert.equal(isBlockVisible(blockNotEquals, { choice1: 'Non' }), false);
});
