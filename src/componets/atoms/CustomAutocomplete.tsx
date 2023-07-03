import ListItem from '@mui/material/ListItem'
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'

type CustomAutocompleteProp<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & {
  id: string
  searchText: string
  setValue: (value: T) => void
  setSearchText: (value: string) => void
  onScroll: () => void
  isLoading: boolean
}

export default function CustomAutocomplete<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>({
  searchText,
  setSearchText,
  setValue,
  isLoading,
  onScroll,
  getOptionLabel,
  ...props
}: CustomAutocompleteProp<T, Multiple, DisableClearable, FreeSolo>) {
  return (
    <Autocomplete
      fullWidth
      onChange={(_, value) => {
        const item = value as T
        console.log(item)
        if (!item) {
          return
        }
        setValue(item)
      }}
      inputValue={searchText}
      onInputChange={(event, value, reason) => {
        if (!event && reason === 'reset') {
          return
        }
        setSearchText(value)
      }}
      noOptionsText='Sin registros'
      filterOptions={(options) => options}
      loading={isLoading}
      loadingText='Cargando...'
      getOptionLabel={getOptionLabel}
      renderOption={(props, option) => {
        if (!getOptionLabel) {
          return
        }
        return (
          <ListItem key={getOptionLabel(option)} {...props}>
            {getOptionLabel(option)}
          </ListItem>
        )
      }}
      ListboxProps={{
        onScroll: (event: React.SyntheticEvent) => {
          const listboxNode = event.currentTarget
          if (listboxNode.scrollTop + listboxNode.clientHeight < listboxNode.scrollHeight) {
            return
          }
          onScroll()
        },
      }}
      {...props}
    ></Autocomplete>
  )
}
