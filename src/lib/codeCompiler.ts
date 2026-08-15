import * as Babel from '@babel/standalone';
import React from 'react';

export interface CompiledComponent {
  Component: React.ComponentType<any> | null;
  error: string | null;
}

export function compileTsxCode(code: string): CompiledComponent {
  try {
    const transformed = Babel.transform(code, {
      presets: [
        ['react', { runtime: 'automatic' }],
        ['typescript', { isTSX: true, allExtensions: true }],
      ],
      filename: 'custom-component.tsx',
    });

    if (!transformed.code) {
      return { Component: null, error: 'Transform produced no output code.' };
    }

    const exports: Record<string, any> = {};
    const moduleScope = { exports, React };

    const wrappedCode = `${transformed.code}
      return typeof exports.default !== 'undefined' ? exports.default :
             typeof exports.Component !== 'undefined' ? exports.Component :
             typeof exports.component !== 'undefined' ? exports.component :
             null;`;

    const factory = new Function('exports', 'React', wrappedCode);
    const Component = factory(exports, React);

    if (!Component || typeof Component !== 'function') {
      return {
        Component: null,
        error:
          'No exported component found. Make sure your code has a default export or a named "Component" export.',
      };
    }

    return { Component, error: null };
  } catch (err: any) {
    return { Component: null, error: err.message || String(err) };
  }
}
