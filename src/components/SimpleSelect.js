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

  // Filter out resources that meet all 3 criteria
  const updatedResources = (updatedSelection) => (
    allResources.filter(res => {
      const matches =  Object.keys(updatedSelection).map(key => {
        if (updatedSelection[key] === ``) return true

        if (typeof(res[key] )=== `string`) {
          // handle selection for keys: service, cost
          return stringToSlug(res[key]) === updatedSelection[key]
        } else {
          // handle selection for key: location
          if (updatedSelection[key] === 'ontario-wide') {
            return true
          } else {
            // get sligifiedLocationArray for that res
            const sligifiedLocation = res[key].map(loc => stringToSlug(loc))

            return (
              sligifiedLocation.includes(updatedSelection[key]) ||
              sligifiedLocation.includes('ontario-wide')
            )
          }
        }
      })
      return matches.every(match => match === true)
    })
  )

  const handleChange = (event) => {
    // Update selection
    const updatedSelection  = {
      ...selection,
      [event.target.name]: event.target.value
    }
    setSelection(updatedSelection)

    // Update resources based on the updated selection
    setResources(updatedResources(updatedSelection))
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
