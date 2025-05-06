import { z } from "zod";

export const domainUrlValidation = z.object({
    domain: z.string({ message: "Domain cannot be empty ... ! Peyman is watching you 👀" })
    .regex(
      /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
      "Domain must start with http:// or https:// and be a valid domain (e.g., https://peyman.com)"
    ),})

export const domainUpdateValidation = z.object({
    domain: z.string({ message: "Domain cannot be empty ... ! Peyman is watching you 👀" })
    .regex(
      /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
      "Domain must start with http:// or https:// and be a valid domain (e.g., https://peyman.com)"
    ),    isActive: z.boolean().optional(),
    status: z.string().optional()
})