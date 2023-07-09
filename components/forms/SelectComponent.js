export default function SelectComponent({ placeholder, name, onChange }) {
  return (
    <div>
      <label htmlFor="babyGender" className="block text-sm font-medium leading-6 text-gray-900">
        Gender select
      </label>
      <select
        id="babyGender"
        name={name}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
        onChange={onChange}
      >
        <option></option>
        <option>Male</option>
        <option>Female</option>
      </select>
    </div>
  );
}
