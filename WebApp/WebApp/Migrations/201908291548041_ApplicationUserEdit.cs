namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ApplicationUserEdit : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AspNetUsers", "Activated", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.AspNetUsers", "Activated", c => c.Boolean(nullable: false));
        }
    }
}
