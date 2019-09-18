export const overlayAddAction = "OVERLAY_ADD";
export const overlayRemoveAction = "OVERLAY_REMOVE";

const overlays = [];

export default function overlaysReducer(state = overlays, action = {}) {
  switch (action.type) {
    case overlayAddAction:
      return [...state, {
        id: action.id,
        blur: action.blur,
        component: action.component
      }]
    case overlayRemoveAction:
      return _.filter(state, (entry) => {
        return entry.id !== action.id
      })
    default:
      return state
  }
}

export function overlayAdd(id, component, blur = true, route = null) {

  return {
    type: overlayAddAction,
    id,
    blur,
    component
  }
}

export function overlayRemove(id) {
  return {
    type: overlayRemoveAction,
    id
  }
}
