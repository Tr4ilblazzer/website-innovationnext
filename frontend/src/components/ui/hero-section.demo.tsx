import { FinancialHero } from '@/components/ui/hero-section'

const FinancialHeroDemo = () => {
  return (
    <div className="w-full bg-background">
      <FinancialHero
        title={
          <>
            Ready to Transform Your <br />
            <span className="text-primary">Management?</span>
          </>
        }
        description="Experience the future of finance with our cutting-edge SaaS platform. Start optimizing your financial operations today!"
        buttonText="Download app"
        buttonLink="#"
        imageUrl1="https://images.unsplash.com/photo-1579965342575-16428a7c8881?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900?q=80&w=1974&auto=format&fit=crop"
        imageUrl2="https://plus.unsplash.com/premium_photo-1664013263421-91e3a8101259?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900?q=80&w=2070&auto=format&fit=crop"
      />
    </div>
  )
}

export default FinancialHeroDemo
