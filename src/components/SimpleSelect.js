import React from 'react'
import { stringToSlug, capitalize } from '../utils/helpers'

import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 200,
    maxWidth: 450,
    width: `100%`,
    "& .MuiInputBase-root": {
      background: `var(--off-white)`,
      borderRadius: 12,
    },
  }
}));

function ResourcesSelect({ allResources, setResources, selection, setSelection, selectLabel, menuItems }) {
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
        IconComponent={KeyboardArrowDownIcon}
      >
        {menuItems.map(item => (
          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

// Start Page Questions
function QuestionsSelect({ selectLabel, selected, options, index, setSelected, setResponse }) {
  const classes = useStyles(selected);

  const handleChange = (event) => {
    // Find the corresponding section
    const i = event.currentTarget.dataset.index
    const question = document.querySelector(`[data-step="${i}"] .question`).parentElement
    question.style.paddingTop = `8vmax`

    // Update value for Select
    setSelected(event.target.value)
    // Find the option that matches the value selected
    const selectedOption = options.find(({option}) => option === event.target.value)
    // set the response based onthe selected option
    setResponse(selectedOption.response)
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id={`select-outlined-label-${index}`}>{selectLabel}</InputLabel>
      <Select
        labelId={`select-outlined-label-${index}`}
        id={`select-outlined-${index}`}
        value={selected}
        onChange={handleChange}
        label={selectLabel}
        IconComponent={KeyboardArrowDownIcon}
      >
        {options.map(item => (
          <MenuItem key={item.option} data-index={index} value={item.option}>
            {item.option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

// Cases Select
function CasesSelect({ selectLabel, menuItems, province, setProvince, allCases, setCases, theme }) {
  const classes = useStyles();

  const handleChange = (event) => {
    // Update value for Select
    const updatedProvince = event.target.value
    setProvince(updatedProvince)

    // Find the cases that matches Province & Theme selected
    const updatedCases = allCases
      .filter(cas => {
        const matchProv = stringToSlug(cas.province) === updatedProvince
        const matchTheme = theme === "All" ? true : cas.themes.includes(theme)

        return matchProv && matchTheme
      })

    // Set Cases based the selected province
    setCases(updatedCases)
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id={"select-province"}>{selectLabel}</InputLabel>
      <Select
        labelId={"select-province"}
        value={province}
        onChange={handleChange}
        label={selectLabel}
        IconComponent={KeyboardArrowDownIcon}
      >
        {menuItems.map(item => (
          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}


export { ResourcesSelect, QuestionsSelect, CasesSelect }
