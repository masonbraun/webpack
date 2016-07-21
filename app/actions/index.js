//action creators, dispatch

export const DO_AWESOME_THING = 'DO_AWESOME_THING';

export const setVisibilityFilter = (index) => {
  return {
    type: DO_AWESOME_THING,
    index
  }
}