import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 200,
    width: `100%`,
    "& .MuiInputBase-root": {
      borderRadius: `12px`
    }
  }
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [service, setService] = React.useState("");

  const handleChange = (event) => {
    setService(event.target.value);
  };

  // TODO: to be replaced
  const data = {
    title: `Sevice`,
    items: [
      {label: `Legal Information`, value: `legal-information`},
      {label: `Legal Representation`, value: `legal-representation`}
    ]
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="select-outlined-label">{data.title}</InputLabel>
      <Select
        labelId="select-outlined-label"
        id="select-outlined"
        value={service}
        onChange={handleChange}
        label={data.title}
      >
        {data.items.map(item => (<MenuItem value={item.value}>{item.label}</MenuItem>))}
      </Select>
    </FormControl>
  );
}
