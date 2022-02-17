import * as React from 'react';
import { Switch } from '@mui/material';
import useAdminBike from '../../../hooks/Admin/useAdminBike';

export default function SwitchBike({ bike }) {
  const { updateBike } = useAdminBike();
  return (
    <>
      {bike.active ? (
        <Switch
          value={bike.active ?? ' '}
          defaultChecked
          onClick={(e) => updateBike(bike.id, !bike.active)}
        />
      ) : (
        <Switch
          value={!bike.active ?? ' '}
          onClick={(e) => updateBike(bike.id, !bike.active)}
        />
      )}
    </>
  );
}
