
import GjsEditor, {
  AssetsProvider,
  Canvas,
  //ModalProvider,
} from '@grapesjs/react';
import type { Editor, EditorConfig } from 'grapesjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CustomAssetManager from './components/CustomAssetManager';
//@ts-ignore
import plugin from './grapesjs-tailwind/src';

// import CustomModal from './components/CustomModal';
// import CustomAssetManager from './components/CustomAssetManager';
// import Topbar from './components/Topbar';

import './style.css';
import RightSidebar from './components/RightSidebar';
import { MAIN_BORDER_COLOR } from './components/common';
import Topbar from './components/Topbar';

// const sessionStoragePlugin = (editor:Editor) => {
//   // As sessionStorage is not an asynchronous API,
//   // the `async` keyword could be skipped
//   editor.Storage.add('local', {
//     async load(options = {}) {
//       // @ts-ignore
//       return JSON.parse(localStorage.getItem(options.key));
//     },

//     async store(data, options = {}) {
//       sessionStorage.setItem(options.key, JSON.stringify(data));
//     }
//   });
// };


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const gjsOptions: EditorConfig = {
  height: '100vh',
  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  plugins: [plugin],
  pluginsOpts: {
    [plugin]: { /* options */ }
  },
  commands: {

  },
};

export default function App() {
  const onEditor = async (editor: Editor) => {

    (window as any).editor = editor;
    const commands = editor.Commands;
    //@ts-ignore
    const hasData = GLOBAL_GRAPEJS_DATA;

    if (hasData) {
      const projectData = JSON.parse(hasData);
      editor.loadProjectData(projectData);

    }



    commands.add('core:save', () => {
      const pageData = editor.getProjectData();
      const htmlData = editor.getHtml();
      const css = editor.getCss();
      //const htmlWithCss = editor.runCommand('gjs-get-inlined-html');


      let form = document.getElementById('form') as HTMLFormElement;
      let contentInput = document.getElementById('content') as HTMLInputElement;
      let cssInput = document.getElementById('css') as HTMLInputElement;
      let pageDataInput = document.getElementById('pageData') as HTMLInputElement;

      contentInput.value = htmlData.toString();
      cssInput.value = css ?? '';
      pageDataInput.value = JSON.stringify(pageData)
      form.submit();
      alert('saved')

    });

  };


  return (
    // @ts-ignore
    <ThemeProvider theme={theme}>
      <GjsEditor
        className="gjs-custom-editor text-white bg-slate-900"
        grapesjs="https://unpkg.com/grapesjs"
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        options={gjsOptions}
        plugins={[
          {
            id: 'gjs-blocks-basic',
            src: 'https://unpkg.com/grapesjs-blocks-basic',
          },
        ]}
        onEditor={onEditor}
      >
        <div className={`flex h-full border-t `}>
          <div className="gjs-column-m flex flex-col flex-grow">
            <Topbar className="min-h-[48px]" />
            <Canvas className="flex-grow gjs-custom-editor-canvas" />
          </div>
          <RightSidebar
            className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`}
          />
        </div>
        {/* <ModalProvider>
          {({ open, title, content, close }) => (
            <CustomModal
              open={open}
              title={title}
              children={content}
              close={close}
            />
          )}
        </ModalProvider> */}
        <AssetsProvider>
          {({ assets, select, close, Container }) => (
            <Container>
              <CustomAssetManager
                assets={assets}
                select={select}
                close={close}
              />
            </Container>
          )}
        </AssetsProvider>
      </GjsEditor>
    </ThemeProvider>
  );
}
