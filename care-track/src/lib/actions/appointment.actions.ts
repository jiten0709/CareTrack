"use server"

import {
    APPOINTMENTS_COLLECTION_ID,
    DATABASE_ID,
    databases,
    messaging,
} from "@/lib/appwrite.config"
import { ID, Query } from "node-appwrite"
import { parseStringify } from "@/lib/utils"
import { Appointment } from "@/types/appwrite.types"
import { formatDateTime } from "@/lib/utils"
import { error } from "console"
import { revalidatePath } from "next/cache"

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
    userId,
    appointment,
    type,
}: UpdateAppointmentParams) => {
    try {
        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENTS_COLLECTION_ID!,
            appointmentId,
            appointment,
        )

        if (!updatedAppointment) throw new Error("Failed to update the appointment :: appointment.actions")

        const message = `Greetings from CareTrack! ${type === "schedule" ? `Your appointment is scheduled on ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform you that your appointment for ${formatDateTime(appointment.schedule!).dateTime} is cancelled. Reason: ${appointment.cancellationReason}`}`
        const messageSent = await sendSMSNotification(userId, message)

        if (!messageSent) throw new Error("Failed to send the SMS notification :: appointment.actions")

        revalidatePath("/admin")

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

// send sms notification
export const sendSMSNotification = async (userId: string, content: string) => {
    try {
        const message = await messaging.createSms(
            ID.unique(),
            content,
            [],
            [userId]
        )

        return parseStringify(message)
    } catch (error) {
        console.error("An error occurred while sending the SMS notification :: appointment.actions: ", error)
    }
}