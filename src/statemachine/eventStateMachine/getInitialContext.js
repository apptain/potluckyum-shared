const getInitialContext = () => ({
  selectedEvent: {},
  unsavedChanges: {},
  validationErrors: [],
  eventUpdating: false,
  eventGetting: false,
  invitationSending: {},
  invitationSendingResult: {}
});

export default getInitialContext;
