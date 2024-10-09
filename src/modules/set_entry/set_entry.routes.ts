import { Router } from 'express';
import { createSetEntry, updateSetEntry, getSetEntries, deleteSetEntry } from './set_entry.controller';

export const setEntryRoute = Router();

setEntryRoute.post('/set-entry', createSetEntry);
setEntryRoute.put('/set-entry/:id', updateSetEntry);
setEntryRoute.get('/set-entries/:id', getSetEntries);
setEntryRoute.delete('/set-entry/:id', deleteSetEntry);