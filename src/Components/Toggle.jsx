import Switch from 'react-switch';

function Toggle({ checked, onChange }) {
  return (
    <Switch
      onChange={onChange}
      checked={checked}
      uncheckedIcon={false}
      checkedIcon={false}
      className="react-switch"
      onColor="#EE5F54"
    />
  );
}

export default Toggle;
