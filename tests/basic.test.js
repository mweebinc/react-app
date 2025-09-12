// Basic test to validate the app structure
import { describe, it, expect } from 'vitest';

describe('Basic App Tests', () => {
  it('should have a valid package.json', () => {
    const packageJson = require('../package.json');
    expect(packageJson.name).toBe('nq-dashboard');
    expect(packageJson.version).toBeDefined();
  });

  it('should have required dependencies', () => {
    const packageJson = require('../package.json');
    expect(packageJson.dependencies).toHaveProperty('react');
    expect(packageJson.dependencies).toHaveProperty('react-router-dom');
    expect(packageJson.dependencies).toHaveProperty('tailwindcss');
  });

  it('should have development dependencies', () => {
    const packageJson = require('../package.json');
    expect(packageJson.devDependencies).toHaveProperty('@vitejs/plugin-react');
    expect(packageJson.devDependencies).toHaveProperty('vite');
    expect(packageJson.devDependencies).toHaveProperty('puppeteer');
  });
});
