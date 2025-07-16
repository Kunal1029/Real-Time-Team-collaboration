
import {  useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../components/Redux/store";
import type { TypedUseSelectorHook } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 'TypedUseSelectorHook' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.ts(1484)