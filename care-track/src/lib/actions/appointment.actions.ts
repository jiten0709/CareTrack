"use server"

import {
    APPOINTMENTS_COLLECTION_ID,
    DATABASE_ID,
    databases,
} from "@/lib/appwrite.config"
import { ID } from "node-appwrite"
import { parseStringify } from "@/lib/utils"

// create appointment
export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENTS_COLLECTION_ID!,
            ID.unique(),
            appointment
        )

        return parseStringify(newAppointment)
    } catch (error) {
        console.error("An error occurred while creating a new appointment :: appointment.actions: ", error)
    }
}

// update appointment
export const updateAppointment = async ({
    appointmentId,
    appointment,
}: UpdateAppointmentParams) => {
    try {
        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENTS_COLLECTION_ID!,
            appointmentId,
            appointment
        )

        if (!updatedAppointment) throw new Error("Failed to update the appointment :: appointment.actions")

        return parseStringify(updatedAppointment)
    } catch (error) {
        console.error("An error occurred while updating the appointment :: appointment.actions: ", error)
    }
}
