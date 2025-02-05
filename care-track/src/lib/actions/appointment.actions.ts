"use server"

import {
    APPOINTMENTS_COLLECTION_ID,
    DATABASE_ID,
    databases,
} from "@/lib/appwrite.config"
import { ID, Query } from "node-appwrite"
import { parseStringify } from "@/lib/utils"
import { Appointment } from "@/types/appwrite.types"

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

// get appointment
export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await databases.getDocument(DATABASE_ID!, APPOINTMENTS_COLLECTION_ID!, appointmentId)

        return parseStringify(appointment)
    } catch (error) {
        console.error("An error occurred while retrieving the appointment details :: appointment.actions: ", error)
    }
}

// get count of appointment by status
export const getAppointmentCount = async () => {
    try {
        const appointments = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENTS_COLLECTION_ID!,
            [Query.orderDesc("$createdAt")]
        )

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0,
        }

        const counts = (appointments.documents as Appointment[]).reduce(
            (acc, appointment) => {
                switch (appointment.status) {
                    case "scheduled":
                        acc.scheduledCount++
                        break
                    case "pending":
                        acc.pendingCount++
                        break
                    case "cancelled":
                        acc.cancelledCount++
                        break
                }
                return acc
            }, initialCounts
        )

        const data = {
            totalCount: appointments.total,
            ...counts,
            documents: appointments.documents,
        }

        return parseStringify(data)
    } catch (error) {
        console.error("An error occurred while retrieving the appointment count :: appointment.actions: ", error)
    }
}
