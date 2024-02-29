import * as React from 'react';
import { DevicesProvider, WithEditor } from '@grapesjs/react';
import { Button, ButtonGroup } from '@mui/material';
import FormControl from '@mui/material/FormControl';
//import MenuItem from '@mui/material/MenuItem';
//import Select from '@mui/material/Select';
//import { BTN_CLS, MAIN_BORDER_COLOR, cx } from './common';
import { cx } from './common';
import TopbarButtons from './TopbarButtons';
import { mdiCellphone, mdiMonitor, mdiTablet } from '@mdi/js';


import Icon from '@mdi/react';
export default function Topbar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('gjs-top-sidebar flex items-center p-1', className)}>

      <DevicesProvider>
        {({ select }) => (
          <FormControl size="small">

            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
              <Button onClick={() => select('mobilePortrait')}><Icon path={mdiCellphone} size={1} /></Button>
              <Button onClick={() => select('mobileLandscape')}><Icon path={mdiCellphone} size={1} /></Button>
              <Button onClick={() => select('tablet')}><Icon path={mdiTablet} size={1} /></Button>
              <Button onClick={() => select('desktop')}><Icon path={mdiMonitor} size={1} /></Button>
            </ButtonGroup>

            {/* <Select value={selected} onChange={(ev) => select(ev.target.value)}>
              {devices.map((device) => (
                <MenuItem value={device.id} key={device.id}>
                  {device.getName()} {device.id}
                </MenuItem>
              ))}
            </Select> */}
          </FormControl>
        )}
      </DevicesProvider>
      <WithEditor>
        <TopbarButtons className="ml-auto px-2" />
      </WithEditor>
    </div>
  );
}
