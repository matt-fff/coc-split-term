import { commands, ExtensionContext, Terminal, workspace, events } from 'coc.nvim';

let terminal: Terminal | null = null;
let showing = false;

export async function activate(context: ExtensionContext): Promise<void> {
  workspace.showMessage(`werd ${Math.floor(Math.random() * 10000 + 1)}`);

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

    commands.registerCommand('split-term.Destroy', () => {
      if (terminal) {
        terminal.dispose();
        terminal = null;
        showing = false;
      }
    }),

    workspace.registerKeymap(
      ['n'],
      'split-term-toggle',
      async () => {
        workspace.showMessage(`tog: PID ${terminal ? await terminal.processId : -1}`);
        await toggle();
      },
      { sync: false }
    ),

    workspace.registerKeymap(
      ['n'],
      'split-term-hide',
      async () => {
        workspace.showMessage(`hide: PID ${terminal ? await terminal.processId : -1}`);
        await hide();
      },
      { sync: false }
    ),

    workspace.registerKeymap(
      ['n'],
      'split-term-show',
      async () => {
        workspace.showMessage(`show: PID ${terminal ? await terminal.processId : -1}`);
        await show();
      },
      { sync: false }
    )
  );
}

async function setTerminal(): Promise<boolean> {
  if (terminal) {
    return true;
  } else {
    terminal = await workspace.createTerminal({ name: 'coc-terminal' });
    if (terminal) {
      events.on('TermClose', (bufnr: number, recreate = false) => {
        workspace.showMessage(`bufnr: ${bufnr}, ${recreate}`, 'warning');
      });
      return true;
    }
  }
  workspace.showMessage(`Create terminal failed`, 'error');
  return false;
}

async function hide(): Promise<void> {
  if (terminal) {
    workspace.showMessage(`term: ${terminal}`);
    terminal.hide();
  }

  showing = false;
}

async function show(): Promise<void> {
  if (!(await setTerminal())) {
    showing = false;
    workspace.showMessage(`Show terminal failed`, 'error');
    return;
  }

  if (!(terminal && terminal.show())) {
    terminal = null;
    await show();
  }
  showing = true;
}

async function toggle(): Promise<void> {
  if (showing) {
    await hide();
  } else {
    await show();
  }
}
