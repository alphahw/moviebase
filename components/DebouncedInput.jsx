import { useState, useMemo, useEffect } from 'react'
import { debounce } from 'lodash-es'

export default function DebouncedInput({
  className, placeholder, query, onChange
}) {
  const [value, setValue] = useState(query)

  const changeHandler = (event) => {
    if (event.target.value.length) {
      onChange(event.target.value)
    }
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    [changeHandler]
  );
  
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    }
  }, [debouncedChangeHandler]);

  return (
    <div>
      <input
        onChange={debouncedChangeHandler}
        defaultValue={value}
        type="text"
        placeholder={placeholder}
        className={className}
        data-test-debounced-input
      />
    </div>
  );
}