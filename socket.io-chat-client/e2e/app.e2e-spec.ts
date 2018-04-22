import { Socket.IoClientPage } from './app.po';

describe('socket.io-client App', () => {
  let page: Socket.IoClientPage;

  beforeEach(() => {
    page = new Socket.IoClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
