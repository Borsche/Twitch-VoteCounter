/**import Poll from './poll';
import PollResult from './poll-result';

const pollopts = [
  "1",
  "2",
  "3"
]

const poll = new Poll(pollopts);

poll.onPollClosed((result: PollResult[]) => {
    console.log(result);
});

poll.endPoll();
**/
import { app, BrowserWindow, globalShortcut } from 'electron';
import Poll from './poll/poll';

export default class Window {
      private static instance: Window;

      private constructor() {  
        app.whenReady().then(this.createWindow)
        
        app.on('window-all-closed', () => {
          if (process.platform !== 'darwin') {
            app.quit()
          }
        })
        
        app.on('activate', () => {
          if (BrowserWindow.getAllWindows().length === 0) {
            this.createWindow()
          }
        })
      }

      private createWindow () {
        const win = new BrowserWindow({
          width: 800,
          height: 600,
          webPreferences: {
            nodeIntegration: true
          }
        })
      
        win.loadURL('http://localhost:3000');
        this.registerPollResetKey('PageUp');
      }

      public static getInstance(): Window {
        if(!Window.instance) {
          Window.instance = new Window();
        }

        return Window.instance;
      }

      public registerPollResetKey(key: string){
        globalShortcut.register(key, () => {
          Poll.getInstance().resetPoll();
        })
      }
}