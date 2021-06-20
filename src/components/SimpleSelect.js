import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { stringToSlug, capitalize } from '../utils/helpers'
import ResourcesPage from '../pages/resources'

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 200,
    width: `100%`,
    "& .MuiInputBase-root": {
      borderRadius: `12px`
    }
  }
}));

export default function SimpleSelect({ allResources, setResources, selection, setSelection, selectLabel, menuItems }) {
  const classes = useStyles();
  // const [selected, setSelected] = React.useState("");

  const handleChange = (event) => {
    // create a copy of the selection
    const updatedSelection  = {
      ...selection,
      [event.target.name]: event.target.value
    }
    setSelection(updatedSelection)
    // TODO: set resources
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="select-outlined-label">{capitalize(selectLabel)}</InputLabel>
      <Select
        labelId="select-outlined-label"
        id="select-outlined"
        value={selection[selectLabel]}
        onChange={handleChange}
        label={selectLabel}
        name={selectLabel}
      >
        {menuItems.map(item => (
          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
