import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { stringToSlug, capitalize } from '../utils/helpers'

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

    // update resources
    // filter out resources that meet all 3 criteria
    const updatedResources = allResources.filter(res => {
      const matches = []

      Object.keys(updatedSelection).forEach(key => {
        if (updatedSelection[key] === ``) {
          matches.push(true)
        } else if (typeof(res[key] )=== `string`) {
          // check key: service, cost
          const match = stringToSlug(res[key]) === updatedSelection[key]
          matches.push(match)
        } else {
          // check key: location
          if (updatedSelection[key] === 'ontario-wide') {
            matches.push(true)
          } else {
            // get sligifiedLocationArray for that res
            const sligifiedLocation = res[key].map(loc => stringToSlug(loc))
            const match = sligifiedLocation.includes(updatedSelection[key])
            matches.push(match)
          }
        }
      })
      return matches.every(match => match === true)
    })
    setResources(updatedResources)
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
