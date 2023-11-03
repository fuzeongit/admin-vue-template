import { defineConfig } from '@unocss/vite';
import presetUno from '@unocss/preset-uno';
import transformerDirectives from '@unocss/transformer-directives';
import presetAttributify from '@unocss/preset-attributify';

const POSITION_ABBR = {
  t: 'top',
  r: 'right',
  b: 'bottom',
  l: 'left'
};

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', '.git', '.husky', '.vscode', 'public', 'build', 'mock', './stats.html']
    }
  },
  presets: [
    presetUno({ dark: 'class' }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    presetAttributify({
      prefix: 'un-',
      prefixedOnly: true // <--
    })
  ],
  transformers: [transformerDirectives()],
  shortcuts: [
    [/^side-(.*)$/, ([, c]) => `w-${c} h-${c}`],
    [
      /^(absolute|fixed)-([t|r|b|l]{2,4})$/,
      ([, c, d]) => {
        let position = c;
        d.split('').forEach(it => {
          position += ` ${POSITION_ABBR[it as 't' | 'r' | 'b' | 'l']}-0`;
        });
        return position;
      }
    ],
    [/^(flex|inline-flex)-(center|stretch)$/, ([, c, d]) => `${c} justify-${d} items-${d}`],
    [/^(flex|inline-flex)-col-(center|stretch)$/, ([, c, d]) => `${c}-col ${c}-${d}`],
    [/^(flex|inline-flex)-(x|y)-center$/, ([, c, d]) => `${c} ${d === 'x' ? 'justify-center' : 'items-center'}`],
    [/^(absolute|fixed)-center$/, ([, c]) => `${c} flex-center side-full`],
    [/^(w|h)-(.*)-(.*)$/, ([, c, d, e]) => `${c}-${d} aspect-${e}`],
    {
      'nowrap-hidden': 'whitespace-nowrap overflow-hidden',
      'ellipsis-text': 'nowrap-hidden overflow-ellipsis',
      'transition-base': 'transition-all duration-300 ease-in-out',
      'flex-1-hidden': 'flex-1 overflow-hidden'
    }
  ],
  theme: {
    colors: {
      primary: 'rgb(var(--primary-color))',
      primary_hover: 'rgb(var(--primary-color-hover))',
      primary_pressed: 'rgb(var(--primary-color-pressed))',
      primary_active: 'rgba(var(--primary-color-active),0.1)',
      primary_1: 'rgb(var(--primary-color1))',
      primary_2: 'rgb(var(--primary-color2))',
      primary_3: 'rgb(var(--primary-color3))',
      primary_4: 'rgb(var(--primary-color4))',
      primary_5: 'rgb(var(--primary-color5))',
      primary_6: 'rgb(var(--primary-color6))',
      primary_7: 'rgb(var(--primary-color7))',
      primary_8: 'rgb(var(--primary-color8))',
      primary_9: 'rgb(var(--primary-color9))',
      info: 'rgb(var(--info-color))',
      info_hover: 'rgb(var(--info-color-hover))',
      info_pressed: 'rgb(var(--info-color-pressed))',
      info_active: 'rgb(var(--info-color-active),0.1)',
      success: 'rgb(var(--success-color))',
      success_hover: 'rgb(var(--success-color-hover))',
      success_pressed: 'rgb(var(--success-color-pressed))',
      success_active: 'rgb(var(--success-color-active),0.1)',
      warning: 'rgb(var(--warning-color))',
      warning_hover: 'rgb(var(--warning-color-hover))',
      warning_pressed: 'rgb(var(--warning-color-pressed))',
      warning_active: 'rgb(var(--warning-color-active),0.1)',
      error: 'rgb(var(--error-color))',
      error_hover: 'rgb(var(--error-color-hover))',
      error_pressed: 'rgb(var(--error-color-pressed))',
      error_active: 'rgb(var(--error-color-active),0.1)',
      dark: '#18181c'
    }
  }
});
