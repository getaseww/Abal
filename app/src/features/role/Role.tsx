import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {
  Role,
  useAddRoleMutation,
  useGetRolesQuery,
  useGetErrorProneQuery,
} from '../../app/services/role'
// import { selectIsAuthenticated, logout } from '../auth/authSlice'

const AddRole = () => {
  const initialValue = { name: '' }
  const [role, setRole] = useState<Partial<Role>>(initialValue)
  const [addRole, { isLoading }] = useAddRoleMutation()

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setRole((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await addRole(role)
    setRole(initialValue)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="column column-3">
          <input
            name="name"
            placeholder="New post name"
            type="text"
            onChange={handleChange}
            value={role.name}
          />
        </div>
        <div className="column column-1">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Post'}
          </button>
        </div>
      </div>
    </form>
  )
}

const RoleListItem = ({
  data: { name, id },
  onSelect,
}: {
  data: Role
  onSelect: (id: number) => void
}) => {
  return (
    <li>
      <a href="#" onClick={() => onSelect(id)}>
        {name}
      </a>
    </li>
  )
}

const RoleList = () => {
  const { data: roles, isLoading } = useGetRolesQuery()
  const navigate = useNavigate()

  if (isLoading) {
    return <div>Loading</div>
  }

  if (!roles) {
    return <div>No posts :(</div>
  }

  return (
    <div>
      {roles.map((role) => (
        <RoleListItem
          key={role.id}
          data={role}
          onSelect={(id) => navigate(`/role/${id}`)}
        />
      ))}
    </div>
  )
}

export const RolesManager = () => {
  const [initRetries, setInitRetries] = useState(false)
  const { data, error, isFetching } = useGetErrorProneQuery(undefined, {
    skip: !initRetries,
  })
  const dispatch = useDispatch()

  return (
    <div>
      <h3>Posts</h3>
      {/* {!isAuthenticated ? (
        <button
          onClick={() => login({ ignore: 'This will just set the headers' })}
        >
          Login
        </button>
      ) : (
        <button onClick={() => dispatch(logout())}>Logout</button>
      )} */}
      <button onClick={() => setInitRetries(true)}>
        {isFetching ? 'retrying...' : 'Start error prone retries'}
      </button>
      <hr />
      <div className="row">
        <div className="posts-list">
          <AddRole />
          <hr />
          Posts:
          <RoleList />
          <hr />
          List with duplicate subscription:
          <RoleList />
        </div>
        <div className="column column-3 text-left">
          <Routes>
            {/* <Route path="/:id" element={<PostDetail />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default RolesManager
