import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultTemplates, getTemplateById } from '../../src/data/templates';

test('defaultTemplates contient au moins les 4 templates essentiels', () => {
  assert.equal(defaultTemplates.length >= 4, true);
  const ids = defaultTemplates.map(t => t.id);
  assert.equal(ids.includes('satisfaction-client'), true);
  assert.equal(ids.includes('inscription-evenement'), true);
  assert.equal(ids.includes('demande-devis'), true);
  assert.equal(ids.includes('recrutement-candidature'), true);
});

test('chaque template possède des blocs valides et au moins deux questions', () => {
  defaultTemplates.forEach(t => {
    assert.equal(t.blocks.length >= 2, true);
    assert.equal(typeof t.title, 'string');
    assert.ok(t.icon);
    assert.ok(t.category);
  });
});

test('getTemplateById retourne le bon modèle ou undefined', () => {
  const t = getTemplateById('satisfaction-client');
  assert.ok(t);
  assert.equal(t?.category, 'feedback');

  const invalid = getTemplateById('non-existent');
  assert.equal(invalid, undefined);
});
