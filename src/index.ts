import { commands, ExtensionContext, Terminal, workspace } from 'coc.nvim';

let terminal: Terminal | null = null;
let showing = false;

export async function activate(context: ExtensionContext): Promise<void> {
  context.subscriptions.push(
    commands.registerCommand('split-term.Toggle', async () => {
      await toggle();
    }),
    commands.registerCommand('split-term.Hide', async () => {
      await hide();
    }),

    commands.registerCommand('split-term.Show', async () => {
      await show();
    }),

    workspace.registerKeymap(
      ['n'],
      'split-term-toggle',
      async () => {
        await toggle();
      },
      { sync: false }
    ),

    workspace.registerKeymap(
      ['n'],
      'split-term-hide',
      async () => {
        await hide();
      },
      { sync: false }
    ),

    workspace.registerKeymap(
      ['n'],
      'split-term-show',
      async () => {
        await show();
      },
      { sync: false }
    )
  );
}

async function hide(): Promise<void> {
  if (!terminal) {
    return;
  }

  terminal.hide();
  showing = false;
}

async function show(): Promise<void> {
  if (!terminal) {
    terminal = await workspace.createTerminal({ name: 'coc-terminal' });
    if (!terminal) {
      workspace.showMessage(`Create terminal failed`, 'error');
      return;
    }
  }

  terminal.show();
  showing = true;
}

async function toggle(): Promise<void> {
  if (!terminal) {
    terminal = await workspace.createTerminal({ name: 'coc-terminal' });
    if (!terminal) {
      workspace.showMessage(`Create terminal failed`, 'error');
      return;
    }
  }

  if (showing) {
    terminal.hide();
    showing = false;
  } else {
    terminal.show();
    showing = true;
  }
}
