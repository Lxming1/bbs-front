export const Select = () => {
  return (
    <select
      className="select w-30 mr-2 text-neutral select-sm select-bordered"
      defaultValue="content">
      <option value="content">Content</option>
      <option value="user">User</option>
      <option value="label">Label</option>
    </select>
  )
}
